var express = require('express');
var router = express.Router();
var Food = require('./Food');
var mongoose = require('mongoose');

router.get('/listFoods',function(req,res){
    Food.find({'type' : 'food'}).exec(function(err, doc) {
        if(err){
            console.log(err);
            res.status(415).send(err);
        }
        else res.status(200).send(doc);
    });
});
router.get('/listDrinks',function(req,res){
    Food.find({'type' : 'drink'}).exec(function(err, doc) {
        if(err){
            console.log(err);
            res.status(415).send(err);
        }
        else res.status(200).send(doc);
    });
});

router.post('/add',function(req,res){
    Food.create({
        _id : new mongoose.Types.ObjectId(),
        name : req.body['name'],
        price : req.body['price'],
        ingredients : req.body['ingredients'],
        type : req.body['type']
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
    Food.find({'_id' : req.body['_id']}).exec(function(err,foods){
        if(err!=null){
            console.log(err);
            res.status(415).send(err);
        }
        else {
            for(var i = 0; i < foods.length; i++){
                foods[i].ingredients = req.body['ingredients'];
                foods[i].name = req.body['name'];
                foods[i].price = req.body['price'];
                foods[i].type = req.body['type'];
                foods[i].save();
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
    Food.findOne({'_id' : req.query['id']}).exec(function(err,food){
        if (err!=null) {
            console.log(err);
            res.status(415).send(err);
        }
        else {
            food.name = food.name + ' [DELETED]';
            food.save();
            res.status(200).send("Success");
        }
    });
    /*Food.remove({'_id' : req.query['id']}, function(err){
        if (err!=null) {
            console.log(err);
            res.status(415).send(err);
        }
    });
    res.status(200).send("Success");*/
});

module.exports = router;