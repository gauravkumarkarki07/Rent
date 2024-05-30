import propertyModel from "../models/propertyModel.js";

export const Logout=async(req,res)=>{
    try {
        res.clearCookie('access_token')
            .status(200).json({
                messsage:"Logout Successful"
            })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const AddProperty=async(req,res)=>{
    const{title,description,address,propertyType,bedroom,bathroom,price,propertyImage,userId}=req.body;
    try {
        const newProperty=new propertyModel({
            title,
            description,
            address,
            propertyImage,
            propertyType,
            bedroom,
            bathroom,
            price,
            userId
        })
        await newProperty.save()
        res.status(201).json({
            message:"New Property Has Been Added"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const GetPropertyByUserId=async(req,res)=>{
    const userId=req.params.userId;
    try {
        const getProperties=await propertyModel.find({userId:userId});
        if(!getProperties){
            res.status(400).json({
                message:"No Properties"
            })
            return
        }
        res.status(200).json({
            propertyDetails:getProperties,
            message:"Properties Loaded Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const GetAllProperty=async(req,res)=>{
    try {
        const getAllPropertyDetails=await propertyModel.find();
        if(!getAllPropertyDetails){
            res.status(400).json({
                message:"No Properties"
            })
            return
        }
        res.status(200).json({
            propertyDetails:getAllPropertyDetails,
            message:"Successfully Fetched All Property"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}