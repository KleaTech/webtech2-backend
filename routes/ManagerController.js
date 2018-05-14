var express = require('express');
var router = express.Router();
var Order = require('./Order');
var Food = require('./Food');
var Bartender = require('./Bartender');

router.get('/foodStatistics',function(req,res){
    Food.find({}).exec(function(err,foods){
        var ingredientsWithDuplicates = [];
        for (let food of foods) {
            for (let ing of food.ingredients) {
                ingredientsWithDuplicates.push(ing.trim());
            }
        }
        var ingredients = ingredientsWithDuplicates.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
        var numbers = [];
        for (let ing of ingredients) {
            var num = 0;
            for (let i of ingredientsWithDuplicates) {
                if (i==ing) num++;
            }
            numbers.push(num);
        }
        console.log(ingredients);
        console.log(numbers);
        res.status(200).send([ingredients, numbers]);
    });
});
router.get('/orderStatistics',function(req,res){
    Bartender.find({}).exec(function(err,bartenders){
        Order.find({})
            .populate({path: 'bartender', model: Bartender})
            .exec(function(err,orders){
            var numbers = [];
            for (let bart of bartenders) {
                var num = 0;
                for (let ord of orders) {
                    if (ord.bartender._id.toString()===bart._id.toString()) num++;
                }
                numbers.push(num);
            }
            res.status(200).send(numbers);
        });
    });
});

module.exports = router;