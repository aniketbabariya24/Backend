const express= require('express');
require('dotenv').config()
const { connection } = require('./configs/db');
const { UserModel } = require('./models/User.model');
const app= express();
app.use(express.json());

const {userRoute}= require('./routes/user.route')
const {postRoute}= require('./routes/note.route')
const {authenticate}= require('./middleware/verify.middleware')
app.use('/users', userRoute);
app.use(authenticate);
app.use('/posts', postRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error while Connected DB");
        console.log(error);
    }
    console.log("Run on port");
})