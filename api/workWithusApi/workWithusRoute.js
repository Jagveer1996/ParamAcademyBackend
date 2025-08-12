const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();

const workWithusController = require('./workWithusController');
const uploadDoc = require('../../middleware/uploadDocument');

router.post('/', uploadDoc.single('upload_document') , workWithusController.createWorkWithus);

router.get('/all', workWithusController.getWorkWithusAll);

router.get('/:id', workWithusController.getWorkWithusID);

router.put('/:id', uploadDoc.single('upload_document'), workWithusController.updateWorkWithus);

router.delete('/:id', workWithusController.deleteWorkWithus);

module.exports = router;