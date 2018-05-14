var mongoose = require('mongoose');
var Order = require('./Order');
var Food = require('./Food');
var Bartender = require('./Bartender');
var Customer = require('./Customer');
var express = require('express');
var router = express.Router();

router.get('/list',function(req,res){
    if (req.query.status==='all') {
        Order.find({})
            .populate({path: 'foods', model: Food})
            .populate({path: 'customer', model: Customer})
            .populate({path: 'bartender', model: Bartender})
            .exec(function(err, doc) {
            if(err){
                console.log(err);
                res.status(415).send(err);
            }
            else res.status(200).send(doc);
        });
    }
    else {
        Order.find({'status' : req.query.status})
            .populate({path: 'foods', model: Food})
            .populate({path: 'customer', model: Customer})
            .populate({path: 'bartender', model: Bartender})
            .exec(function(err, doc) {
            if(err){
                console.log(err);
                res.status(415).send(err);
            }
            else res.status(200).send(doc);
        });
    }
});
router.get('/listForCustomer',function(req,res){
   Order.find({customer: req.query.customer})
       .populate({path: 'foods', model: Food})
       .populate({path: 'bartender', model: Bartender})
       .exec(function(err, doc) {
       if(err){
           console.log(err);
           res.status(415).send(err);
       }
       else res.status(200).send(doc);
   })
});
router.get('/listForBartender',function(req,res){
    Order.find({bartender: req.query.bartender})
        .populate({path: 'foods', model: Food})
        .populate({path: 'customer', model: Customer})
        .populate({path: 'bartender', model: Bartender})
        .exec(function(err, doc) {
            if(err){
                console.log(err);
                res.status(415).send(err);
            }
            else res.status(200).send(doc);
        })
});

router.post('/add',function(req,res){
    Order.create({
        _id : new mongoose.Types.ObjectId(),
        status : req.body['status'],
        received : new Date(req.body['received']),
        fulfilled : null,
        customer: req.body['customer']._id,
        bartender : req.body['bartender']._id,
        foods : req.body['foods'].map(food => food._id)
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
    Order.find({'_id' : req.body['_id']}).exec(function(err,orders){
        if(err!=null){
            console.log(err);
            res.status(415).send(err);
        }
        else {
            for(var i = 0; i < orders.length; i++){
                orders[i].status = req.body['status'];
                orders[i].received = new Date(req.body['received']);
                orders[i].fulfilled = new Date(req.body['fulfilled']);
                orders[i].customer = req.body['customer'];
                orders[i].bartender = req.body['bartender'];
                orders[i].foods = req.body['foods'];
                orders[i].save();
            }
            res.status(200).send("Success");
        }
    });
});
router.get('/fulfill',function(req,res){
    Order.findOne({'_id' : req.query.id}).exec(function(err,order){
        if(err!=null || order==null){
            console.log(err);
            res.status(415).send(err);
        }
        else {
            order.status = 'closed';
            order.fulfilled = Date.now();
            order.save();
            res.status(200).send("Success");
        }
    });
});


router.get('/remove',function(req,res){
    if(typeof req.query.id === 'undefined'){
        res.status(415).send('Id is required!');
        return;
    }
    Order.remove({'_id' : req.query['id']}, function(err){
        if (err!=null) {
            console.log(err);
            res.status(415).send(err);
        }
    });
    res.status(200).send("Success");
});

module.exports = router;