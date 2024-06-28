import mongoose from "mongoose";

const tabSchema=new mongoose.Schema({
    // For Priority of Tabs

    name:{
        type:String,
        required:true,
    },

    favicon:{
        type:String,
    },

    url:{
        type: String,
        required:true,    
    },

    // group:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"group",
    //     required:true,
    //     default:null,
    // },

    // group_id:{
    //     type: Number,
    //     required:false,
    // }

},{timestamps:true});

export const Tab=mongoose.model("Tab",tabSchema);