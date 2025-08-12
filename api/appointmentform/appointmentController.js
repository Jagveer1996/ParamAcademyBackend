const knex = require('../../db/knex');
const log = require('node-file-logger');


const createAppointment = async (req, res)=>{
    const {fname, lname, email, course_id, country, phone_no, date} = req.body;
    console.log("backend date", date);
    
    const [id] = await knex('appointment').insert({fname, lname, email, course_id, country, phone_no, date})
    res.status(200).json({"message": "Data Add Successfully", data : {id, fname, lname, email, course_id, country, phone_no, date }})
}

const getAppointmentAll = async(req, res)=>{

    try{
        const data = await knex('appointment').select();
        res.status(200).json({"message" : "Data fetch successfully", data : data});
    }catch(err){
        log.Error("Error while fetching Appointment", err);
    }
    
};

const getAppointmentID = async(req,res)=>{
    const data = await knex('appointment').where({id:req.params.id});
    res.status(200).json({"message" : "Data Fetch by ID Successfully", "data" : data});
};

const updateAppointment =  async (req, res)=>{
    const {fname, lname, email, course_id, country, phone_no, date} = req.body;
    console.log("update date", date);
    
    await knex('appointment').where({id:req.params.id}).update({fname, lname, email, course_id, country, phone_no, date});
    res.status(200).json({"message" : "Data Update successfully", data : req.body});
}

const deleteAppointment = async (req, res) =>{
    await knex('appointment').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data Delete Successfully"});
};
 

module.exports = {createAppointment, getAppointmentAll, getAppointmentID, updateAppointment, deleteAppointment}