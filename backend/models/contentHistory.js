import express from  "express";
import mongo from "mongoose";

const historySchema = new mongo.Schema({
    user:{
        type:mongo.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    content:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const contentHistory = mongo.model('ContentHistory',historySchema);

export default contentHistory;