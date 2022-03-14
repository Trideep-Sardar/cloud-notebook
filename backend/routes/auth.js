const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');
const SIGN_SECRET="userisauth$";

// Route-1-->creating a user with details of user input , here login is not required
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('password','enter a valid password').isLength({ min: 5 }),
    body('email','enter a valid email').isEmail()
    // body('date','enter a valid date').isDate()
],async(req,res)=>{
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  //error consist of array
    }

    // below we are checking if the user already exist or not 
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
      success=false;
      res.status(404).json({success,error:"user with this email already exists!!"})
    }else{
      //creating a hash for password to store instead of password string
    const salt =await bcrypt.genSaltSync(10);    //generating salt to add it with our user password
    passSecure=await bcrypt.hashSync(req.body.password, salt);  //creating password hash 
    //below code is to create a user with given user model
    user=await User.create({
        name: req.body.name,
        password: passSecure,
        email:req.body.email
      })
      //generating token to validate our user
      const data={
        user:{
          id:user.id
        }
      }
      success=true;
      const userToken = jwt.sign(data,SIGN_SECRET);
      res.json({success,userToken});
      // res.json(user);
    }}catch(err){
      res.status(500).json({error:err.message})
    }
  }

)

//Route-2--> authenticate user with login credential no login required
router.post('/userlogin',[
  body('email','enter a valid email').isEmail(),
  body('password','enter a valid password').exists()
],async(req,res)=>{
  let success=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  //error consist of array
    }
    try{
      let user=await User.findOne({email:req.body.email});   // this will return a user from db if exist with this email id
      if(!user){  
        success=false;
        res.status(404).json({success,error:"enter valid credential details!!!"})
      }else{
      const data={
        user:{
          id:user.id
        }
      }
      const validPass=await bcrypt.compare(req.body.password,user.password);
      if(!validPass){
        success=false;
        res.status(404).json({success,error:"enter valid credential details!!!"})
      }else{
      const userToken = jwt.sign(data,SIGN_SECRET);
      success=true;
      res.json({success,userToken});
      }
    }}catch(err){
      res.status(500).json({error:err.message})
    }
})


//Route-3--> getting user data with id extracting from token generated while login:login is required
router.post('/getuser',fetchuser,async(req,res)=>{   //here fetchuser is a middleware
  try {
    const user=await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(401).json({error:error});
  }
})

module.exports=router;