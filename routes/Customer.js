var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/webtech2', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //console.log('MongoDB is Open');
});

var Schema = mongoose.Schema;
var CustomerSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    billingAddress : String
});

module.exports = db.model('Customer',CustomerSchema);