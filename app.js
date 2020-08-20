const express = require('express');
const app = express();
const pageRoutes = express.Router();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

let Test = require('./test.model');


app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb://127.0.0.1:27017/testdb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB Connection Established Successfully');
});

pageRoutes.route('/').get(function(req, res){
    Test.find(function(error, test){
        if(error){
            console.log('Error in home page');
        }
        else{
            res.json(test);
        }
    });
});

pageRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Test.findById(id, function(error, test){
        if(error){
            console.log('Error in get data page');
        }
        else{
            res.json(test);
        }
    });
});

pageRoutes.route('/add').post(function(req, res){
    // var testValue = req.json({'emp_ID': '1', 'emp_Name': 'Ravi', 'emp_status': true});
    // let test = new Test(testValue);
    let test = new Test(req.body);
    test.save()
        .then(test => {
            res.status(200).json({'result': 'item added successfully2'});
        })
        .catch(error => {
            res.status(400).send('Adding item failed');
        });
});

pageRoutes.route('/update/:id').post(function(req, res){
    let id = req.params.id;
    Test.findById(id, function(error, test){
        if(!test){
            res.status(400).send('Updating item failed');
        }
        else{
            test.emp_ID = req.body.emp_ID;
            test.emp_Name = req.body.emp_Name;
            test.emp_status = req.body.emp_status;

            test.save().then(test => {
                res.status(200).json('Item Updated');
            })
            .catch(error => {
                res.status(400).send('Updating item failed, while updating');
            })
        }
    });
});

pageRoutes.route('/delete/:id').delete(function(req,res){
    let id = req.params.id;
    Test.findById(id, function(error, test){
        if(test){
            test.deleteOne().then(test => {
                res.status(200).json('Item Deleted');
            })
            .catch(error => {
                res.status(400).send('request failed while deleting the item');
            });
        }
    });
});

app.use('/home', pageRoutes);

app.listen(PORT, function(){
    console.log('Working');
});