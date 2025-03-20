import doctorModel from '../models/doctorModel.js'


//api for adding doctor
const addDoctor=async(req,res)=>{
    
    try{

        const {name,email,speciality,degree,experience,about,fees,serviceCharge,address,available}=req.body

        console.log({name,email,speciality,degree,experience,about,fees,serviceCharge,address});


        //saving doctor data
        const doctorData = {
            name,
            email,
            speciality,
            degree,
            experience,
            about,
            fees,
            serviceCharge,
            address,
            available: available !== undefined ? available : true, 
            date:Date.now()
        }
         const newDoctor=new doctorModel(doctorData)
         await newDoctor.save()

         res.json({success:true,message:"Doctor Added"})

    }catch(error){

        console.log(error)
        res.json({success:true,message:error.message})
    }
}

export {addDoctor}