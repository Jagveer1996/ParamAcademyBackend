const knex = require('../../db/knex');
const express = require('express');
const upload = require('../../middleware/uploadFile');
const auth = require('../../middleware/auth');
const router = express.Router();


// , upload.single('image')
router.post('/', upload.single('image') , async (req, res)=>{

    // console.log(req.body);
    const {courseTitle, discription, overview, learning, course_level, course_duration, course_lectures, course_launguage, course_assessments,course_certificate, category_id} = req.body;

    const image = req.file ? req.file.filename : null;
    const [id] = await knex('coursedetails').insert({courseTitle, image, discription, overview, learning, course_level, course_duration, course_lectures, course_launguage, course_assessments,course_certificate, category_id})

    res.status(200).json({"message" : "Data Add Successfully", data : {id, courseTitle, discription, overview, learning, course_level, course_duration, course_lectures, course_launguage, course_assessments,course_certificate, category_id}});
});


router.get('/all', auth() ,async(req, res)=>{
    const {currentPage, perPage} = req.query;
    const data = await knex('coursedetails').leftJoin('category', 'category.id', 'coursedetails.category_id').select(
        'coursedetails.id as course_id',
         'coursedetails.courseTitle',
         'coursedetails.discription',
         'coursedetails.image',
         'coursedetails.category_id',
         'category.id',
         'category.categoryname'
        
    ).paginate({currentPage : currentPage, perPage : perPage});

    res.status(200).json({"message" : "Data Fetch Successfully", data});
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    // console.log("Incoming request for course ID:", id);

    try {
        const data = await knex('coursedetails')
            .leftJoin('category', 'category.id', 'coursedetails.category_id')
            .select('*')
            .where('coursedetails.id', id);

        // console.log("Backend course data", data);

        if (data.length === 0) {
            return res.status(404).json({ message: "Course not found", data: [] });
        }

        res.status(200).json({ message: "Data Fetch Successfully", data });
    } catch (err) {
        console.error("Error fetching course data", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/:id',upload.single('image'),  async(req, res) =>{
    const {courseTitle, discription, overview, learning, course_level, course_duration, course_lectures, course_launguage, course_assessments,course_certificate, category_id} = req.body;
    const image = req.file ? req.file.filename : null;
    await knex('coursedetails').where({id:req.params.id}).update({courseTitle, discription, overview, learning, image, course_level, course_duration, course_lectures, course_launguage, course_assessments,course_certificate, category_id});
    res.status(200).json({"message" : "Data Update Successfully", data : req.body});
})


router.delete('/:id',auth(['superAdmin', 'admin']), async(req, res) =>{
    // console.log(req.params.id);
    
    await knex('coursedetails').where({id:req.params.id}).del();
    res.status(200).json({"message" : "Data Delete Successfully"});
})


module.exports = router;