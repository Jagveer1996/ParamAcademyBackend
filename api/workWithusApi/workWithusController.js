const knex = require('../../db/knex');

const createWorkWithus = async(req, res)=>{
    const {fname, lname, email, phone_no, social_profile, teaching_experience, why_joinus} = req.body;

    const upload_document = req.file ? req.file.filename : null;

    const [id] = await knex('workwithus').insert({fname, lname, email, phone_no, social_profile, upload_document, teaching_experience, why_joinus})
    res.status(200).json({"message" : "Data Insert Successfully", data : {id, fname, lname, email, phone_no, social_profile, upload_document, teaching_experience, why_joinus}})
}

const getWorkWithusAll = async (req, res)=>{
    const {currentPage, perPage} = req.query;

    const data = await knex('workwithus').select().paginate({currentPage : currentPage, perPage : perPage});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
}  

const getWorkWithusID = async (req,res)=>{
    const data = await knex('workwithus').where({id:req.params.id});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
}

const updateWorkWithus = async (req, res)=>{
    const {fname, lname, email, phone_no, social_profile, teaching_experience, why_joinus} = req.body;

    const upload_document = req.file ? req.file.filename : null;

    await knex('workwithus').where({id:req.params.id}).update({fname, lname, email, phone_no, social_profile, upload_document, teaching_experience, why_joinus});
    res.status(200).json({"message" : "Data Update successfully", data : req.body})
}

const deleteWorkWithus = async (req, res)=>{
    await knex('workwithus').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data Delete Successfully"});
}

module.exports = {createWorkWithus, getWorkWithusAll, getWorkWithusID, updateWorkWithus, deleteWorkWithus}