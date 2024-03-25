const mongoose = require('mongoose')
const {Schema} = mongoose;

const studentSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    rollNumber : {
        type : String, 
        required : true
    },
    recording : {
        type: Schema.Types.ObjectId,
        ref: 'Recording'
    }
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student