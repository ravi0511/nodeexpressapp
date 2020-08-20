const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Test = new Schema({
    emp_ID:{
        type: String
    },
    emp_Name:{
        type: String
    },
    emp_status:{
        type: Boolean
    }
});

module.exports = mongoose.model('Test', Test);