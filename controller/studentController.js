const Student = require('../model/student')
const Report = require('../model/report')
const Recording = require('../model/recording')


const add = async (req,res)=> {
   try{ 
    const {name, rollNumber} = req.body

    const newStudent = new Student({name, rollNumber})

    await newStudent.save()

   return res.status(200).json({message:'Sucessfully added new student'})
}
    catch(err){
        console.log(err)
        return res.status(500).json({Error: err})
    }
}

const fetchAllStudents = async (req,res)=> {
    try{
        const students = await Student.find().populate({
            path: 'recording',
            $options: {sort: {createdAt: -1}},
            populate: {
                path: 'report',
                model: 'Report'
            }
        })


        return res.status(200).json({students})
    }catch(err){
        console.log(err)
        return res.status(500).json({Error : err})
    }
}


const fetchAllStudentsReports= async(req,res)=>{
    try{
        const studentReport = await Report.find().populate({
            path: 'audio',
            $options: {sort: {createdAt: -1}},
            populate: {
                path: 'student',
                model: 'Student'
            }
        })

      
        return res.status(200).json({studentReport})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: err})
    }
}


const fetchStudentByFilters = async(req,res)=> {
    try{
        let query = {}

        if(req.query.name){
            const student = await Student.find({name: {$regex : req.query.name, $options: 'i'}}).select('_id')
            if(!student){
                return res.status(404).json({message: 'Student not fouund'})
            }

            const recordings = await Recording.find({student: {$in: student}})
            const reportIds = recordings.map((recording)=> recording.report)

            query['_id']= {$in : reportIds}


        }
          

        if(req.query.fromDate){
            req.query.toDate = req.query.toDate || new Date()
            query.createdAt =  {$gte :new Date(req.query.fromDate), $lte:new Date(req.query.toDate)}
        }

       
        const students = await Report.find(query).populate({
            path: 'audio',
            $options: {sort: {createdAt: -1}},
            populate: {
                path: 'student',
                model: 'Student'
            }
        })

        return res.status(200).json({students})

    }catch(err){
        console.log(err)
        return res.status(500).json({Error: err})
    }
}

const fetchSingleStudentReport = async (req,res)=> {
    try{
        const {reportId} =req.params
        const studentReport = await Recording.findOne({report: reportId}).populate('report student')

        return res.status(200).json({studentReport})
    }catch(err){
        console.log(err)
        return res.status(500).json({Error: err})
    }
}

module.exports= {add,fetchAllStudents, fetchStudentByFilters ,fetchSingleStudentReport,fetchAllStudentsReports}