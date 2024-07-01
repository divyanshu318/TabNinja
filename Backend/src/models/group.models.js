import mongoose from "mongoose";

const groupItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    colour: {
      type: String,
      default: "#000000",
    },
    url: {
      type: String,
    },

    tabs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tab",
        default: [],
      },
    ],
  },
  {}
);

// const groupsSchema=new mongoose.Schema({
//     items:{
//         type: [groupItemSchema] ,
//         required:true,
//         default:null,
//     },
//     ownedby:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     }
// },{timestamps:true});

export const Group = mongoose.model("Group", groupItemSchema);
