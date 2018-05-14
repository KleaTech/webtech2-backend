var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/webtech2', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //console.log('MongoDB is Open');
});

var Schema = mongoose.Schema;
var FoodSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    price : Number,
    ingredients : [String],
    type : String
});
module.exports = db.model('Food',FoodSchema);