var express = require('express');
var router = express.Router();
var Bartender = require('./Bartender');
var mongoose = require('mongoose');

router.get('/list',function(req,res){
    Bartender.find({}).exec(function(err, doc) {
        if(err){
            console.log(err);
            res.status(415).send(err);
        }
        else res.status(200).send(doc);
    });
});

router.post('/add',function(req,res){
    Bartender.create({
        _id : new mongoose.Types.ObjectId(),
        name : req.body['name']
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
    Bartender.find({'_id' : req.body['_id']}).exec(function(err,barts){
        if(err!=null){
            console.log(err);
            res.status(415).send(err);
        }
        else {
            for(var i = 0; i < barts.length; i++){
                barts[i].name = req.body['name'];
                barts[i].save();
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