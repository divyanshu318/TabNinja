import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const tabdataSchema=new mongoose.Schema({
   url:{
    type:String,
    required:true,
   },
   activetime:{
    type:Number,
    default:0
   }
})

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        lowercase:true,
    },

    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
    },

    password:{
        type: String,
        required:true,
    },

    refreshToken:{
        type: String,
    },

    // Array of Group Objects->Check for Default
    group_list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Group', 
    }],

    // Array of Tab Objects->Check for Default
    tab_list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Preview',
    }],

    timeout:{
        type:Number,
        default:-1,
    },

    sortData:[tabdataSchema],

},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=async function(){
    const accessToken=jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
    return accessToken
}

userSchema.methods.generateRefreshToken=async function(){
    const refreshToken=jwt.sign(
        {
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
    return refreshToken
}

export const User=mongoose.model("User",userSchema);