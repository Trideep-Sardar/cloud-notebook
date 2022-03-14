const express=require('express');
const fetchuser = require('../Middleware/fetchuser');
const router=express.Router();
const Notes=require('../models/Notes');
const { body, validationResult } = require('express-validator');



//router-1 get the notes of user

router.get('/getnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});      //here we are getting notes using user id therefore we have to specify it in our notes model to fetch accordingly  (foreign key);
        res.json(notes);       
    } catch (error) {
        res.status(401).send({error:`${error}`})
    }
})

//route-2 create notes 
router.post('/createnotes',[
    body('title','enter a valid title').isLength({min:5}),
    body('description','enter a valid description').isLength({min:5}),
    body('tag','enter a valid tag').isLength({min:5})
],fetchuser,async(req,res)=>{
    const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try{
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote);
    } catch (error) {
      res.status(500).json({error:error.message})
    }
})


//route--3 update notes of a user

router.put('/updatenotes:id',fetchuser,async(req,res)=>{
    try {
        const newNote={};
        if(req.body.title){newNote.title=req.body.title};
        if(req.body.description){newNote.description=req.body.description};
        if(req.body.tag){newNote.tag=req.body.tag};
        let note=await Notes.findById(req.params.id);
        if(!note){
            res.status(401).json({error:"not found"});
        }
        if(note.user.toString()!==req.user.id){     //this condition check is for user to validate that the user is having same id as per in notes model id(foriegn key)
            res.status(401).json({error:"not found"});
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note);
        
    } catch (error) {
        res.json({error:`${error}`});
    }
})

//route--4 delte notes of a user

router.delete('/deletenotes:id',fetchuser,async(req,res)=>{
    try {
        let note=await Notes.findById(req.params.id);
        if(!note){
            res.status(404).json({error:"not found"});
        }
        if(note.user.toString()!==req.user.id){     //this condition check is for user to validate that the user is having same id as per in notes model id(foriegn key)
            res.status(401).json({error:"not allowed"});
        }
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json(note);
        
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }
})

module.exports=router;