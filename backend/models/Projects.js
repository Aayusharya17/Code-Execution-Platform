const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File',
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('Project',projectSchema);