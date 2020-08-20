const express = require('express');
const app = express();
var port = process.env.port || 3000;
app.get('/',(req, res)=> {
    res.send('Hello World Updated');
});
app.listen(port, ()=> {
    console.log('Server running on port:' + port);
});