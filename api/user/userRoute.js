const knex = require('../../db/knex');
const express =require('express');
const { sendStudentCreationMail } = require('../../utils/emailService');

const router = express.Router();

router.post('/abc', async(req, res)=>{
    
    console.log("first", req.body);

    const { email, password } = req.body;
    const [id] = await knex('user').insert({email, password});
    try{
        await sendStudentCreationMail(email, email);
    }catch(err){
        console.log("failed to fetch");
        
    }
    res.status(200).json({"message":"User registered successfully", data :{id, email, password}});
})






module.exports = router;