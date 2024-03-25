const mongoose = require('mongoose')
const {Schema} = mongoose

const recordingSchema = new Schema ({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    report: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
    url : {
        type : String,
        required : String
    },
    responseTime : {
        type : Number
        
    },
    createdAt : {
        type : Date,
        default: Date.now
    }
})

const Recording = mongoose.model('Recording', recordingSchema)
module.exports= Recording