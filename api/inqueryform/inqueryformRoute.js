const knex = require('../../db/knex');
const express = require('express');
const router = express.Router();

const inqueryformController = require('./inqueryformController');


router.post('/', inqueryformController.createInqueryForm);

router.get('/all', inqueryformController.getInqueryFormAll);

router.get('/:id', inqueryformController.getInqueryFormID);

router.put('/:id', inqueryformController.updateInqueryForm);

router.delete('/:id', inqueryformController.deleteInqueryForm);


module.exports = router;