const mongoose = require('mongoose');
const { MONGO_URI } = require('./serverConfig');

function dbConnect(){
    try{
        mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch(e){
        console.log("Error connecting to MongoDB:",e.message);
    }
}

module.exports = dbConnect;