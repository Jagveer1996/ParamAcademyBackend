const knex = require('../../db/knex');

const createCategory = async(req, res)=>{
    const {categoryname} = req.body;
    const [id] = await knex('category').insert({categoryname});

    res.status(200).json({"message" : "Data Insert Successfully", data : {id, categoryname}})
}

const getCategoryAll = async (req, res) =>{
    const data = await knex('category').select();
    res.status(200).json({"message": "Data Fetch Successfully", data : data});
};

const getCategoryID = async (req, res)=>{
    const data = await knex('category').where({id:req.params.id})
    res.status(200).json({"message": "Data Fetch Successfully", data : data})
}

const updateCategory = async (req, res)=>{
    const {categoryname} = req.body;
    await knex('category').where({id:req.params.id}).update({categoryname});

    res.status(200).json({"message" : "Data update Successfully", data : {categoryname}})

}

const deleteCategory = async (req, res)=>{
    const data = await knex('category').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data Delete Successfully"});
}

module.exports = {createCategory, getCategoryAll, getCategoryID, updateCategory, deleteCategory}



