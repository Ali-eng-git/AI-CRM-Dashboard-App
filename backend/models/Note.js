import mongoose from "mongoose";

const noteSchma = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqruied:true,
        index:true,
    },
    content:{type:String, required:[true,"Note content is required"]},
    lead:{type:mongoose.Schema.Types.ObjectId,ref:"Lead" ,default:null },
    contact:{type:mongoose.Schema.Types.ObjectId,ref:"Contact" ,default:null },
    pinned:{type:Boolean, default:false},
},
{timestamps:true})

export const Note  = mongoose.model("Note",noteSchma)