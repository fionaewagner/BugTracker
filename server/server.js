import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv/config'
import errorHandler from './middleware/error.js';
import bodyParser from 'body-parser';

import { authRouter } from './routes/auth.js';
import { privRouter } from './routes/private.js';
import { bugsRouter } from './routes/bugs.js';
import { groupRouter } from './routes/group.js';
import { commentRouter } from './routes/comment.js';

//const authRoute = require('./Controller/routes/auth.js')

const app = express();

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true},(err)=>{
    if(!err){
        return console.log("connected to database");
    }
    console.log(err);
})


const PORT = process.env.PORT || 5000

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter)
app.use('/bugs', bugsRouter)
app.use('/private', privRouter)
app.use('/group', groupRouter)
app.use('/comment', commentRouter)

//ERROR HANDLER MUST BE LAsT
app.use(errorHandler)


const server = app.listen(PORT, ()=>{
    console.log("Listening on port"+ PORT)
})

process.on("unhandledRejection", (err, promise)=>{
    console.log(err);
    server.close(()=>process.exit(1))
})