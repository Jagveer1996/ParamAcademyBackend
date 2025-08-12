const knex = require('../../db/knex');
const express = require('express');
const upload = require('../../middleware/uploadFile');
const router = express.Router();

router.post('/', upload.single('profile'), async (req, res) =>{
    const {testimonial_description} = req.body;
    const profile = req.file ? req.file.filename : null;
    
    const [id] = await knex('testimonial').insert({testimonial_description, profile});

    res.status(200).json({"message" : "Data Insert Successfully", data : {id, testimonial_description, profile}})

})

router.get('/all', async (req, res)=>{
    const data = await knex('testimonial').select();

    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
});

router.get('/:id', async (req, res)=>{
    const data = await knex('testimonial').where({id:req.params.id});

    res.status(200).json({"message" : "Data Fetch by ID Successfully", data : data});
})


router.put('/:id', upload.single('profile'), async (req, res)=>{

    const {testimonial_description} = req.body

    const profile = req.file ? req.file.fieldname : null;

    await knex('testimonial').where({id:req.params.id}).update({testimonial_description, profile});

    res.status(200).json({"message" : "Data Update by ID Successfully", data : {testimonial_description, profile}});

})

router.delete('/:id', async (req, res)=>{
    await knex('testimonial').where({id:req.params.id});

    res.status(200).json({"message" : "Data Delete Successfully"});
})

module.exports = router;