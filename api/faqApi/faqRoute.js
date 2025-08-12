const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=>{
    const {question, answer} = req.body;

    const [id] = await knex('faq').insert({question, answer});

    res.status(200).json({"message" : "Data Insert Successfully", data : {id, question, answer}})

})

router.get('/all', async (req, res)=>{
    const data = await knex('faq').select();

    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
})

router.get('/:id', async (req, res)=>{
    const data = await knex('faq').where({id:req.params.id});

    res.status(200).json({"message" : "Data Fetch by ID Successfully", data : data});    
})

router.put('/:id', async (req, res)=>{
    const {question, answer} = req.body;
    await knex('faq').where({id:req.params.id}).update({question, answer});

    res.status(200).json({"message" : "Data Update by ID Successfully", data : {question, answer}});    

})

router.delete('/:id', async (req, res)=>{
    await knex('faq').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data DELETE by ID Successfully"});    

})

module.exports = router;