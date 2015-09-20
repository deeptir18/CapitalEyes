// function updateTag() {
// 	$.ajax({
// 		type: "POST",
// 		url: "/addTransaction",
// 		data: "&transactionID=" + transactionID + "&userID=" + userID + "&tag=" + tag,
// 		success: function(data) {
// 			console.log(data)
// 			// transactionID = data.transactionID
// 			// userID = data.userID
// 			// tag = data.tag
// 		}


// 	});	
// }

//multiple tags
function addMoreTags() {
	$.ajax({
		type: "POST",
		url: "/updateTransaction",
		data: "&transactionID=" + transactionID + "&tag=" + tag,
		success: function(data) {
			transactionID = data.transactionID
			tag = data.tag
		}
		

	});
}


function login() {
	var userID = "55e94a6cf8d8770528e618dc";

	$.ajax({
		type: "GET",
		url: "/login",
		data: "&userID=" + userID
		success: function(data) {
			// transactionID = data.transactionID
			// tag = data.tag
			console.log("logging in")
			var budgets = data.budgetArray
			var transactions = data.transactionArray

		}

	});
}