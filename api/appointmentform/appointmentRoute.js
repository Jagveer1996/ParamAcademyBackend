const express = require('express');
const router = express.Router();
const appointmentController = require('./appointmentController');
const knex = require('../../db/knex');



router.post('/', appointmentController.createAppointment)

router.get('/all', appointmentController.getAppointmentAll);

router.get('/:id', appointmentController.getAppointmentID);

router.put('/:id', appointmentController.updateAppointment);

router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;