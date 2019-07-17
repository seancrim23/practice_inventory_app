const mongoose = require('mongoose');

function connectDb(){
    try{
        mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
        console.log('Successfully connected to MongoDB instance!');
    }catch(e){
        console.log(e);
    }
};

module.exports = {
    connectDb
};