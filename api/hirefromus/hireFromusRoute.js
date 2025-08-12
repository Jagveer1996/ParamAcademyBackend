const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();
const hireFromusController = require('./hireFromusController');
const uploadDoc = require('../../middleware/uploadDocument');

router.post('/',uploadDoc.single('upload_document'), hireFromusController.createHireFromus);


router.get('/all', hireFromusController.getHireFromusALL);

router.get('/:id', hireFromusController.getHireFromusID);

router.put('/:id', uploadDoc.single('upload_document') ,hireFromusController.updateHireFromus)

router.delete('/:id', hireFromusController.deleteHireFromus)


module.exports = router;