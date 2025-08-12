const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();

const categoryController = require('./categoryController');

router.post('/', categoryController.createCategory);

router.get('/all', categoryController.getCategoryAll);

router.get('/:id', categoryController.getCategoryID);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;