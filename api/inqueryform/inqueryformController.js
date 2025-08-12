const knex = require('../../db/knex')

const createInqueryForm = async (req,res)=>{
    const {fname, lname, email, course_id, country, phone_no, education, status, approved } = req.body;
    console.log("first",approved)
    const [id] = await knex('inquiry').insert({fname, lname, email, course_id, country, phone_no, education, status, approved })
    res.status(200).json({"message": "Data Add Successfully", data : {id, fname, lname, email, course_id, country, phone_no, education, status, approved }})
}

let getInqueryFormID =  async(req, res) =>{
    const data = await knex('inquiry').where({id:req.params.id});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
}

const getInqueryFormAll = async (req, res)=>{
    const {currentPage, perPage} = req.query;
    const data = await knex('inquiry').select().paginate({currentPage : currentPage, perPage : perPage});
    res.status(200).json({"message" : "Data Fetch Successfully", data : data});
}

const updateInqueryForm = async(req,res)=>{
    const {fname, lname, email, course_id, country, phone_no, education, status, approved } = req.body;
    await knex('inquiry').where({id:req.params.id}).update({fname, lname, email, course_id, country, phone_no, education, status, approved })
    res.status(200).json({"message": "Data Update Successfully", data : req.body})
}


const deleteInqueryForm = async (req, res)=>{
    const data = await knex('inquiry').where({id:req.params.id}).del();
    res.status(200).json({"message": "Data Delete Successfully"});
}


module.exports = {createInqueryForm, getInqueryFormAll, getInqueryFormID, updateInqueryForm, deleteInqueryForm}