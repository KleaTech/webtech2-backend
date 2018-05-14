var express = require('express');
var router = express.Router();
var Customer = require('./Customer');
var mongoose = require('mongoose');

router.get('/list',function(req,res){
    Customer.find({}).exec(function(err, doc) {
        if(err){
            console.log(err);
            res.status(415).send(err);
        }
        else res.status(200).send(doc);
    });
});

router.post('/add',function(req,res){
    Customer.create({
        _id : new mongoose.Types.ObjectId(),
        name : req.body['name'],
        billingAddress : req.body['billingAddress']
    }, function (err,doc) {
        console.log(doc);
        if (err!=null) {
            console.log(err);
            res.status(415).send(err);
        }
        else res.status(200).send("Success");
    });
});

router.post('/update',function(req,res){
    Customer.find({'_id' : req.body['_id']}).exec(function(err,custs){
        if(err!=null){
            console.log(err);
            res.status(415).send(err);
        }
        else {
            for(var i = 0; i < custs.length; i++){
                custs[i].name = req.body['name'];
                custs[i].billingAddress = req.body['billingAddress'];
                custs[i].save();
            }
            res.status(200).send("Success");
        }
    });
});

router.get('/remove',function(req,res){
    if(typeof req.query['id'] === 'undefined'){
        res.status(415).send('Id is required!');
        return;
    }
    Bartender.remove({'_id' : req.query['id']}, function(err){
        if (err!=null) {
            console.log(err);
            res.status(415).send(err);
        }
    });
    res.status(200).send("Success");
});

module.exports = router;