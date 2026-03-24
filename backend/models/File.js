const mongoose = require("mongoose");
const Projects = require("./Projects");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        default:"",
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true,
    },
});