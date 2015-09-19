var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var transactionSchema = new Schema({
	transaction_id: String, //CapitalOne Id for bill, deposit, etc.
	description: String,
	amount: Number,
	date: Date,
	tag: [String]
});

var Transaction = mongoose.model('Transaction', transactionSchema);


var checkLength = function(s) {
  return s.length > 0;
};

Transaction.schema.path('description').validate(checkLength, "Description cannot be empty");
Transaction.schema.path('amount').validate(checkLength, "Amount of money cannot be empty");
Transaction.schema.path('date').validate(checkLength, "Date cannot be empty");
exports.Transaction = Transaction;