const express= require('express');
const UserRouter= express.Router();
const UserModel= require('../Model/user.model');
const bcrypt = require('bcrypt');
const BlackListModel = require('../Model/blacklist.model');
const jwt= require('jsonwebtoken');
const auth = require('../Middleware/auth.middleware');
const upload = require('../Middleware/upload.middleware');

UserRouter.get("/",async(req,res)=>{
    res.send("It's on")
})

UserRouter.post('/register',upload.single('avatar'), async(req,res)=>{
    const {name,age,email,pass,city}= req.body;
    (req.file)
    const avatar = req.file ? req.file.path : null;
    try{
        const exist= await UserModel.findOne({email});
        if(exist){
            return res.status(400).send("User already exist");
        }
        bcrypt.hash(pass,3,async(err,hash)=>{
            if(err){
                return res.status(400).send(err.message);
            }
            const user= new UserModel({
                name,email,city,avatar,pass:hash,age
            });
            await user.save();
            const token = jwt.sign({userID:user._id,userEmail:email,userPass:pass,userAvatar:avatar},"token");
            res.status(200).json({message:"User Registered",token,name:user.name,avatar:user.avatar});
        })
    }catch(err){
        return res.status(400).send(err.message)
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,pass} =req.body;
    (email,pass)
    try{
        const user =await UserModel.findOne({email});
        if (user){
            bcrypt.compare(pass,user.pass,(err, decoded) => {
                if(decoded){
                    const token = jwt.sign({userID:user._id,userEmail:email,userPass:pass,userAvatar:user.avatar},"token");
                    res.status(200).json({message:"User Logged In",token,name:user.name,avatar:user.avatar});
                }else{
                    res.status(400).send("Wrong credentials");
                }
            });
        }else{
            res.status(400).send("User does not exist");
        }
    }catch(err){
        res.status(400).send("User is not found");
    }
});

UserRouter.get("/logout",async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).send("Unauthorized");
        }
        const loggedOut= await BlackListModel({token});
        await loggedOut.save()
        return res.status(200).send("User logged out");
    }catch(err){
        return res.status(400).send(err.message);
    }
});
UserRouter.patch("/edit", auth, async(req,res)=>{
    try{
        const updated= await UserModel.findByIdAndUpdate(req.body.userID,{...req.body},{new:true});
        await updated.save()
        return res.status(200).json({updated});
    }catch(err){
        return res.status(400).send(err.message);
    }
});

UserRouter.get("/relogin",async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(400).send("Unauthorized");
    
        const expired = await BlackListModel.findOne({ token });
        if (expired) return res.status(400).send('User is logged out');
    
        const decoded = jwt.verify(token, "token");
        req.body.userID = decoded.userID;
        
        const { userEmail, userPass } = decoded;
        const user = await UserModel.findOne({ email:userEmail });
    
        if (user) {
            bcrypt.compare(userPass, user.pass, (err, isValid) => {
                if (isValid) {
                    return res.status(200).json({ message: "User Logged In", token, name: user.name, avatar:user.avatar });
                } else {
                    return res.status(400).send("Wrong credentials");
                }
            });
        } else {
            return res.status(400).send("User does not exist");
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
    
});

module.exports= UserRouter