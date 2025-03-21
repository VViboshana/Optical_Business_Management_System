//Kumod
const Glass = require("./glass.model");

//post glass
const postAGlass = async(req,res)=>{
    try {
        const newGlass = await Glass({...req.body}); 
        await newGlass.save();
        res.status(200).send({message:"Glass posted succesfully", glass:newGlass})
    } catch (error) {
        console.error("Error creating Glass",error);
        res.status(500).send({message:"Failed to create a glass"})
    }
}

//get all glasses
const getAllGlasses = async(req,res)=>{
    try {
        const glasses = await Glass.find().sort({createdAt:-1});
        res.status(200).send(glasses)
    } catch (error) {
        console.error("Error fetching Glasses",error);
        res.status(500).send({message:"Failed to fetch glasses"})
    }
}

//get single glass
const getSingleGlass = async(req,res)=>{
    try {
        const {id} = req.params;
        const glass = await Glass.findById(id);
        if(!glass){
            res.status(404).send({message:"Glass not found!"})
        }
        res.status(200).send(glass)
    } catch (error) {
        console.error("Error fetching Glass",error);
        res.status(500).send({message:"Failed to fetch a glass"})
    }
}

//update glass data
const UpdatedGlass = async(req,res)=>{
    try {
        const{id} = req.params;
        const UpdatedGlass = await Glass.findByIdAndUpdate(id, req.body,{new:true});
        if(!UpdatedGlass){
            res.status(404).send({message:"Glass is not found!"})
        }
        res.status(200).send({
            message:"Glass Updated successfully",
            glass: UpdatedGlass
        })
    } catch (error) {
        console.error("Error Updating Glass",error);
        res.status(500).send({message:"Failed to update glass"})
    }
}

const deleteAGlass = async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedGlass = await Glass.findByIdAndDelete(id);
        if(!deletedGlass){
            res.status(404).send({message:"Glass is not found"})
        }
        res.status(200).send({
            message:"Glass Deleted successfully",
            glass: deletedGlass
        })
        
    } catch (error) {
        console.error("Error Deleting Glass",error);
        res.status(500).send({message:"Failed to delete glass"})
    }
};

module.exports = {
    postAGlass,
    getAllGlasses,
    getSingleGlass,
    UpdatedGlass,
    deleteAGlass
}
