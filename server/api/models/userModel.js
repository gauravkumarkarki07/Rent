import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    address:{
        type:String,
    },
    phonenumber:{
        type:String,
    },
    profilePicture:{
        type:String,
        default:"https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }

},{timestamps:true})

const userModel=mongoose.model('UserModel',userSchema);

export default userModel;