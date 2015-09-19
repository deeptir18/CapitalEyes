var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var BudgetSchema = new Schema( {
	user_id: String,
	item: String,
	monthlyMax: Number
});

var BudgetPref = mongoose.model("BudgetObj", BudgetSchema);

var checkLength = function(s) {
	return s.length > 0;
};

BudgetPref.schema.path('item').validate(checkLength, "item cannot be empty");

exports.BudgetPref = BudgetPref;