var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var BudgetSchema = new Schema( {
	userID: String,
	item: String,
	monthlyMax: Number
});

var BudgetPref = mongoose.model("BudgetPref", BudgetSchema);

var checkLength = function(s) {
	return s.length > 0;
};

BudgetPref.schema.path('item').validate(checkLength, "item cannot be empty");

exports.BudgetPref = BudgetPref;