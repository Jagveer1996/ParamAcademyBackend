const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res)=>{
    const {fname, lname, email, phone_no, subject, message} = req.body;
    const [id] = await knex('contactUs').insert({fname, lname, email, phone_no, subject, message});

    res.status(200).json({"message" : "Data Insert Successfully", data : {id, fname, lname, email, phone_no, subject, message} })
})

router.get('/all', async(req, res)=>{
    const {currentPage, perPage} = req.query;
    const data = await knex('contactUs').select().paginate({currentPage : currentPage, perPage :perPage});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});    
})
router.get('/:id', async(req, res)=>{
    const data = await knex('contactUs').where({id:req.params.id});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});   
})
router.put('/:id', async(req, res)=>{
    const {fname, lname, email, phone_no, subject, message} = req.body;
    await knex('contactUs').where({id:req.params.id}).update({fname, lname, email, phone_no, subject, message})
    res.status(200).json({"message" : "Data Update Successfully", data : {fname, lname, email, phone_no, subject, message} });  

})
router.delete('/:id', async()=>{
    await knex('contactUs').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data Delete Successfully"});   

})


module.exports = router;