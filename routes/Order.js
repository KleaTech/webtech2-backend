var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/webtech2', {autoIndex : true});
var Food = require('./Food');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB is Open');
});

var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    _id : Schema.ObjectId,
    status : String,
    received : { type: Date, default: Date.now },
    fulfilled : Date,
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    bartender : { type: Schema.Types.ObjectId, ref: 'Bartender' },
    foods : [{ type: Schema.Types.ObjectId, ref: 'Food' }]
});

module.exports = db.model('Order',OrderSchema);