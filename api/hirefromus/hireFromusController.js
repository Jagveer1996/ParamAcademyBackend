const knex = require('../../db/knex');


const createHireFromus = async (req, res)=>{
    const  {fname, lname, email, phone_no, organization, job_position, skills, comments} = req.body; 
    const upload_document = req.file ? req.file.filename : null;
    const [id] = await knex('hirefromus').insert({fname, lname, email, phone_no, organization, job_position, skills, upload_document, comments})

    res.status(200).json({"message" : "Data Insert Successfully", data : {id, fname, lname, email, phone_no, organization, job_position, skills, upload_document, comments}})
}

const getHireFromusALL = async (req, res)=>{
    const {currentPage, perPage} = req.query;
    const data = await knex('hirefromus').select().paginate({currentPage : currentPage, perPage : perPage});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
}

const getHireFromusID = async (req, res)=>{
    const data = await knex('hirefromus').where({id:req.params.id});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
}

const updateHireFromus = async (req, res)=>{
    const  {fname, lname, email, phone_no, organization, job_position, skills, comments} = req.body; 
    const upload_document = req.file ? req.file.filename : null;
    console.log("upload", req.file)
    await knex('hirefromus').where({id:req.params.id}).update({fname, lname, email,phone_no, organization, job_position, skills, upload_document, comments});

    res.status(200).json({"message" : "Data Update Successfully", data : req.body})
}

const deleteHireFromus = async(req,res)=>{
    await knex('hirefromus').where({id:req.params.id}).del();
    res.status(200).json({"message": "Data Delete Successfully"});
}

module.exports = {createHireFromus, getHireFromusALL, getHireFromusID, updateHireFromus, deleteHireFromus}