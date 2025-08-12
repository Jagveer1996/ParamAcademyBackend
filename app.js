const express = require('express');
const cors = require('cors');
const path = require('path')
const coursedetailRoute = require('./api/coursedetail/coursedetailRoute');
const inqueryformRoute = require('./api/inqueryform/inqueryformRoute');
const appointmentRoute = require('./api/appointmentform/appointmentRoute');
const workWithusRoute = require('./api/workWithusApi/workWithusRoute');
const hireFromusRoute = require('./api/hirefromus/hireFromusRoute');
const contactusRoute = require('./api/contactus/contactusRoute');
const brocureRoute = require('./api/brochureform/brochureRoute');
const user = require('./api/user/userRoute');
const categoryRoute = require('./api/category_course/categoryRoute');
const testimonialRoute = require('./api/testimonialApi/testimonialRoute');
const faqRoute = require('./api/faqApi/faqRoute')
const registrationRoute = require('./api/registration/registrationRoute');

const app = express();
app.use(cors());

app.use(express.json());



app.use('/api/coursedetail', coursedetailRoute)
app.use('/api/user', user);
app.use('/api/inqueryform', inqueryformRoute);
app.use('/api/appointment', appointmentRoute);
app.use('/api/workWithus', workWithusRoute);
app.use('/api/hireFromus', hireFromusRoute);
app.use('/api/contactus', contactusRoute);
app.use('/api/brochure', brocureRoute);
app.use('/api/category', categoryRoute);
app.use('/api/testimonial', testimonialRoute);
app.use('/api/faq', faqRoute);
app.use('/api/registration', registrationRoute);

// ifhq eheb bkby dror

app.use('/', express.static(path.join(__dirname, "uploads", "courseImage")))

app.use('/', express.static(path.join(__dirname, "uploads", "courseDocs")))

const PORT = 8000;
app.listen(PORT, ()=>{console.log("Server port 8000!!!!!!!!!!!!!!!!");
})

