const express = require('express')
const Glass = require('../glasses/glass.model')
const router = express.Router();

//post a glass
router.post("/create-glass",async(req,res)=>{
    try {
        const newGlass = await Glass({...req.body}); 
        await newGlass.save();
        res.status(200).send({message:"Glass posted succesfully", glass:newGlass})
    } catch (error) {
        console.error("Error creating Glass",error);
        res.status(500).send({message:"Failed to create a glass"})
    }
})

//get all books



module.exports=router;