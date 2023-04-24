const express = require("express");
const { userModel } = require("../models/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter = express.Router();



userRouter.get("/", async(req,res) =>{
    const user = await userModel.find()
    res.send(user)
})

///Registering the user

userRouter.post("/register" ,async (req,res) => {

    const {name, email, pass} = req.body;
    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
           return res.send({"msg":"User with this email already exist"})
        }
        bcrypt.hash(pass, 5, async (err, hash)=>{
            if(err) res.send({"msg": "Something went wrong", "error" : err.message})
            else{
                const users = new userModel({name,email,pass: hash})
                await users.save()
                res.send({"msg": "User has been registered"})
            }
        });
      
    }
   catch(err){
    res.send({"msg": "User not registered"})
   }
     
})

///Login the user


userRouter.post("/login", async (req,res) => {
    const {email,pass} = req.body;
    
    try{

        const user = await userModel.find({email})
        console.log(user)
       
    //  
        
        if(user){
            bcrypt.compare(pass, user[0].pass, (err, result) =>{
          
                if(result){
                    const name =  `${user[0]['name']}`
                    const token = jwt.sign({userID: user[0]._id},"masai")
                    res.send({"msg": "Login Successful", "token": token , "email" :email , "name" : name})
                   
                }
                else{
                    res.send({"msg": "Wrong Credentials"})
                }
            });
        }else{
            res.send({"msg": "Wrong Credentials"})
        }

    }
    catch(err){
        res.send({"msg": "Something went wrong", "error" : err.message})
    }
})


module.exports = {
    userRouter
}

