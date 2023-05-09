const express= require('express');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const userRoute= express.Router();

const {UserModel}= require('../models/Users.model')

userRoute.post('/register', async(req,res)=>{
    const {name,email,gender,password}= req.body;
    try {
        bcrypt.hash(password, 4, async(err, securePass)=> {
            if(err){
                res.send("Error while Hashing")
              console.log(err);
            }else{
              const user= new UserModel({name,email,gender,password:securePass});
              await user.save();
              console.log(user);
              res.send("Registered")
            }
          });
    } catch (error) {
        res.send("Error while Register")
        console.log(error);
    }
})

userRoute.post('/login', async(req,res)=>{
    const {email,password}= req.body;
    try {
        const user= await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
              if(result){
                const token=jwt.sign({ course: "fullstack" }, "masai");
                res.send(token);
              }else{
               res.send("Wrong Email / password");
              }
            });
        }else{
           res.send("Wrong Email / password");
        }
    } catch (error) {
        console.log("Error while login");
        console.log(error);
    }
})

module.exports={userRoute};