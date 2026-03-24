require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/code_executor",
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || "http://localhost:3000",
};