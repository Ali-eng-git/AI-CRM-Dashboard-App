import mongoose from "mongoose";

export const LEAD_STATUSES=["New","Qualified","Proposal","Won","Lost"]
export const LEAD_PRIORITIES=["Low","Medium","High"]

const leadSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true,
    },
    name:{type:String, required:[true,"Lead name is required"], trim:true},
    email:{type:String, trim:true, lowercase:true, defualt:""},
    phone:{type:String, trim:true, defualt:""},
    company:{type:String, trim:true, defualt:""},
    status:{
        type:String,
        enum:LEAD_STATUSES,
        default:"New",
        index:true,
    },
    priority:{
        type:String,
        enum:LEAD_PRIORITIES,
        default:"Medium",
    },
    source:{
        type:String,
        enum:["Website","Referal","Cold Outreach","Social","Event","Other"],
        defualt:"Other",
    },
    value:{type:Number, default:0, min:0},
    notes:{type:String, default:""},
    tags:[{type:String, trim:true}],
    aiSummary:{type:String, default:""},
    aiRiskScore:{type:Number, default:""},
    order:{type:Number, default:""},
},
{timestamps:true})

export const Lead = mongoose.model("Lead",leadSchema)