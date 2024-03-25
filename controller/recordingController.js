const Recording = require('../model/recording')
const Student = require('../model/student')

const axios = require('axios')

const upload = async(req,res)=> {
    try{
        const {audio, id} = req.body
        let url = ''
        
        const startTime = Date.now()
        
        await axios.post('https://rorbdox8zg.execute-api.ap-south-1.amazonaws.com/alpha/upload',{
            audioFile : audio
        }).then(async (resp)=>{
            url= resp.data.s3Url

            const responseTime = Date.now()-startTime
            
            let newRecording = new Recording({url, student:id, responseTime}) 
            await newRecording.save()

            let student = await Student.findOne({_id: id})
            student.recording = newRecording._id
            await student.save()

            return res.status(200).json({message: 'Successfully uploaded'})

        }).catch((err)=>{
             console.log(err)
             return res.status(500).json({Error: err})
            })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: err})
    }   
}


module.exports= {upload}