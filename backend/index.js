const express = require('express');
const dbConnect= require("./config/db");
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser');
const {REACT_APP_API_URL} =require("./config/serverConfig");
const cors = require('cors');
const v1Routes = require('./routes/index');

const app=express();

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:REACT_APP_API_URL,
    credentials: true
    }));
app.use('/api',v1Routes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
