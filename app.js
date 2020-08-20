const express = require('express');
const app = express();
const mongoose = require('mongoose');
// let Test = require('./test.model');
var port = process.env.port || 3000;
app.get('/',(req, res)=> {
    res.send('Hello World Second Branch');
});
mongoose.connect('mongodb://127.0.0.1:27017/testdb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB Connection Established Successfully');
});
app.listen(port, ()=> {
    console.log('Server running on port:' + port);
});