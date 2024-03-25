const mongoose = require('mongoose')
const {Schema} = mongoose

const reportSchema = new Schema({
    audio : {
        type : mongoose.Types.ObjectId,
        ref : "Recording",
        required: true
    },
    insDetail: {
        type : String,
    },
    delDetail: {
        type : String,
    },
    subDetail: {
        type : String,
    },
    speechRate : {
        type: Number
    },
    wcpm:{
        type: Number
    },
    responseTime: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Report = mongoose.model('Report', reportSchema)
module.exports= Report