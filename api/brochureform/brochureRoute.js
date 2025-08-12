const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=>{
    const {fullName, email, course, country} = req.body;
    const [id] = await knex('brochure').insert({fullName, email, course, country});

    res.status(200).json({"message" : "Data Insert Successfuly", data : {id, fullName, email, course, country}})
})

router.get('/all', async (req, res)=>{

    const {currentPage, perPage} = req.query;

    const data = await knex('brochure').select().paginate({currentPage : currentPage, perPage : perPage})

    res.status(200).json({"message" : "Data Fatch Successfully", data : data});
})

router.get('/:id', async (req, res)=>{
    const data = await knex('brochure').where({id:req.params.id});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});  
})

router.put('/:id', async (req, res)=>{
    const {fullName, email, course, country} = req.body;
    await knex('brochure').where({id:req.params.id}).update({fullName, email, course, country})
    res.status(200).json({"message" : "Data Update Successfully", data : {fullName, email, course, country} });
})

router.delete('/:id', async (req, res)=>{
    await knex('brochure').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data Delete Successfully"}); 
})




module.exports = router;