$.ajax({
	type: "POST",
	url: "/addTransaction",
	data: "&transactionID=" + transactionID + "&userID=" + userID + "&tag=" + tag,
	success: function(data) {
		transactionID = data.transactionID
		userID = data.userID
		tag = data.tag

		//change stuff in the UI

	}


});


$.ajax({
	type: "POST",
	url: "/updateTransaction",
	data: "&transactionID=" + transactionID + "&tag=" + tag,
	success: function(data) {
		transactionID = data.transactionID
		tag = data.tag

		//change stuff in the UI
	}
	

});


$.ajax({
	type: "GET",
	url: "/login",
	success: function(data) {
		transactionID = data.transactionID
		tag = data.tag

	}

});