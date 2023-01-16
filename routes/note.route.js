const express= require('express');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const postRoute= express.Router();

const {PostModel}= require('../models/Post.model');
const { query } = require('express');

postRoute.get('', async(req,res)=>{
    const device= req.query.device;
    const device1= req.query.device1;
    const device2= req.query.device2;
   try {
    const posts= await PostModel.find();
    const postsd= await PostModel.find({device: device});
    const postsd2= await PostModel.find({device: device1, device:device2});

   if(device=="MOBILE" || device=="PC" || device=="TABLET"){
    res.send(postsd);
   }else if((device1=="MOBILE" && device2=="PC") || (device1=="MOBILE" && device2=="TABLET")
     || (device1=="PC" && device2=="TABLET")){
        res.send(postsd2);
     }
   else{
    res.send(posts);
   }
   } catch (error) {
     console.log("Error While Get Notes");
     console.log(error);
   }
})

postRoute.post('/create', async(req,res)=>{
    const payload= req.body;
    try {
        const post= new PostModel(payload);
        await post.save();
        console.log(post);
        res.send("Note Added")
    } catch (error) {
        console.log("Error while post Creating");
        console.log(error);
    }
})

postRoute.patch('/update/:id', async(req,res)=>{
    const payload= req.body;
    const id= req.params.id;

    try {
        await PostModel.findByIdAndUpdate({"_id":id}, payload);
        res.send("UPDATED")
    } catch (error) {
        res.send("Error While Updating");
        console.log(error);
    }
})

postRoute.delete('/delete/:id', async(req,res)=>{
    const id= req.params.id;
    try {
        await PostModel.findByIdAndDelete({"_id":id});
        res.send("DELETED")
    } catch (error) {
        res.send("Error While DELETING");
        console.log(error);
    }
})


module.exports={postRoute}
