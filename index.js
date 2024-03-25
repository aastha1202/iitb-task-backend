const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const fs = require('fs')
const studentRoutes = require('./routes/studentRoutes')
const recordingRoutes = require('./routes/recordingRoutes')
const reportRoutes = require('./routes/reportRoutes')
const { randomUUID } = require('crypto')
require('dotenv').config()


const app = express()
app.use(cors())


app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: false}))

const accessLogStream = fs.createWriteStream('info.log',{flags :'a'});

app.use(function (req,res,next){
    const requestId = randomUUID();
    const startTime = new Date()
    let apiResponse = null
    let responseTime = null

    const originalEnd = res.end
    res.end = function (chunk, encoding){
        apiResponse = chunk ? chunk.toString() : null
        responseTime = new Date- startTime;
        originalEnd.apply(res,arguments)

        accessLogStream.write(`Request Id :${requestId} , Method: ${req.method} ${req.originalUrl} , response Time - ${responseTime} , api response - ${apiResponse}, \n`)

    }

    next()
})

mongoose.connect((process.env.URI)).then(()=> console.log('mongoose connected')).catch((err)=> console.log(err))


app.use('/student', studentRoutes)
app.use('/recording', recordingRoutes )
app.use('/report', reportRoutes )



app.listen(3000, ()=> {
    console.log('Server started on port 3000')
})