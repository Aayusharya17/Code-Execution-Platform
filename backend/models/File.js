const mongoose = require("mongoose");
const Projects = require("./Project");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
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

module.exports = mongoose.model("File", fileSchema);