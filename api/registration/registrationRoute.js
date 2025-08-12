const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = '1234';
const refresh_SECRET_KEY = "0987";
const bycrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const saltRound = 10;
const crypto = require('crypto');
const { register } = require('module');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const { sendResetMail } = require('../../utils/emailService');

// registration
router.post('/', async (req, res) => {
    const { fname, lname, email, country_id, phone_no, password, role } = req.body;
    const hashedPassword = await bycrypt.hash(password, saltRound);
    const [id] = await knex('registration').insert({ fname, lname, email, country_id, phone_no, password: hashedPassword, role });

    res.status(200).json({ "message": "User Registered Successfully", "data": { id, fname, lname, email, country_id, phone_no, password: hashedPassword, role } })
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await knex('registration').where({ email }).select()

    if (!user[0]) {

        res.status(400).json({ "message": "Incorrect email" })
    }

    const matchPassword = await bycrypt.compare(password, user[0].password);

    // console.log(matchPassword)   
    const role = user[0].role
    
    console.log("registration role check", user[0].role);

    if (matchPassword) {
        const AccessToken = jwt.sign({ id: user[0].id, fname: user[0].fname, role : user[0].role }, SECRET_KEY, { expiresIn: '55m' });

        const refresh_token = jwt.sign({id : user[0].id, fname : user[0].fname}, refresh_SECRET_KEY, {expiresIn : '7d'});

        await knex('registration').where({id: user[0].id}).update({refresh_token})

        res.status(200).json({ "message": "User Logged IN Successfully", "data": { email, role  , AccessToken } })

    } else {
        res.status(400).json({ "message": "Incorrect password" })
    }

})

router.post('/refresh-token', async (req, res) => {
    const {refresh_token} = req.body

    if(!refresh_token) return res.status(400).json({"message" : "Refersh Token Required"});

    try{
        const payload = jwt.verify(refresh_token, refresh_SECRET_KEY);
        const user = await knex('registration').where({id : payload.id}).first();

        if(!user || user.refresh_token !== refresh_token){
            return res.status(403).json({message : 'Invalid refresh token'});
        }

        console.log("user123455", user);

        const newAccessToken = jwt.sign({ id: user.id, fname: user.fname }, SECRET_KEY, { expiresIn: '55m' });

        const newrefresh_token = jwt.sign({id : user.id, fname : user.fname}, refresh_SECRET_KEY, {expiresIn : '7d'});

        await knex('registration').where({id: user.id}).update({refresh_token:newrefresh_token})

        res.json({"accessToken" : newAccessToken, "refresh_token" : newrefresh_token })

    }catch(err){
        res.status(401).json({"message" : err});
    }
});


router.post('/change-password', auth() ,async(req, res)=>{
    const userID = req.user?.id;
    // console.log("userID", userID);
    const {oldpassword, newpassword} = req.body;

    const user = await knex('registration').where({id : userID}).first();
    if(!user) return res.status(404).json({"message" : "user not found"});

    const match = await bycrypt.compare(oldpassword , user.password);
    if(!match) return res.status(400).json({"message" : "Incorrect Password"});

    const hashed = await bycrypt.hash(newpassword, 10);
    await knex('registration').where({id : userID}).update({password:hashed});

    res.status(200).json({"message" : "Password changed successfully"});
    
})

router.post('/forgot-password', async(req, res)=>{

    const {email} = req.body;

    const user = await knex('registration').where({email}).first();
    if(!user) return res.status(404).json({message : "email not found"})

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 *15); //15 Minutes

    await knex('registration').where({id : user.id}).update({reset_token : resetToken, reset_token_expiry : expiry})

    //this link redirect to front reset password page
    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;

    await sendResetMail(email, resetLink);

    res.status(200).json({"message" : "Reset Link sent to your email"});
})


router.post('/reset-password', async (req, res)=>{
    const {token , newpassword} = req.body;

    const user = await knex('registration').where({reset_token : token})
    .andWhere('reset_token_expiry', '>', new Date()).first();

    if(!user) return res.status(400).json({message : 'Invalid or expired token'});

    const hashed = await bycrypt.hash(newpassword, 10);
    await knex('registration').where({id : user.id}).update({password : hashed, reset_token: null, reset_token_expiry : null});

    res.status(200).json({message : "Password has been reset"});

});

router.post('/logout', async (req, res) =>{
    const {refresh_token} = req.body;

    try{
        const payload = jwt.verify(refresh_token, refresh_SECRET_KEY);
        await knex('registration').where({id : payload.id}).update({refresh_token : null});
        res.status(200).json({message : "Logged out Successfully"})
    }catch(err){
        res.status(400).json({message : err});
    }

})



router.get('/all', async (req, res) => {
    const data = await knex('registration').select();

    res.status(200).json({ "message": "Data Fetch Successfully", "data": data })
});

router.get('/:id', async (req, res) => {
    const data = await knex('registration').where({ id: req.params.id });

    res.status(200).json({ "message": "Data Fetch by ID Successfully", "data": data })

})

router.put('/:id', async (req, res) => {
    const { fname, lname, email, country_id, phone_no, password } = req.body;

    await knex('registration').where({ id: req.params.id }).update({ fname, lname, email, country_id, phone_no, password });

    res.status(200).json({ "message": "User update Successfully", "data": { fname, lname, email, country_id, phone_no, password } })


})

router.delete('/:id', async (req, res) => {
    await knex('registration').where({ id: req.params.id }).del();

    res.status(200).json({ "message": "Data Delete Successfully" })
})

module.exports = router;