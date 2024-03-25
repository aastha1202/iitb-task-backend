const { default: axios } = require('axios')
const Recording = require('../model/recording')
const Report = require('../model/report')
require('dotenv').config()


const generateReport = async(req,res) => {
    try{
        const {recordingId} = req.body
        const recording = await Recording.findOne({_id:recordingId})

        if(!recording){
            return res.status(404).json({message: 'Found No recording'})
        }
        console.log(recording)

        const startTime = Date.now()

        // Call SaS api
        await axios.post('https://505a4vjhyk.execute-api.ap-south-1.amazonaws.com/prod/scoring', {
                s3_url : recording.url,
                reference_text_id: 'EN-OL-RC-247-1'
            },
            {
                headers: {
                'content-type': 'application/json',
                'x-api-key' : process.env.SAS_API_KEY,  
            }}).then(async (response)=> {
                console.log(response.data)
                const speechRate= response.data.speech_rate
                const wcpm= response.data.wcpm
                const insDetail= response.data.ins_details
                const delDetail= response.data.del_details
                const subDetail= response.data.subs_details
                const responseTime= Date.now() - startTime;

                console.log(insDetail,delDetail,subDetail)

                const report = new Report({audio: recordingId,speechRate, wcpm, responseTime, insDetail, delDetail, subDetail})
        
                await report.save()
        
                recording.report = report._id
                await recording.save()
        
                return res.status(200).json({report})
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





module.exports = {generateReport}