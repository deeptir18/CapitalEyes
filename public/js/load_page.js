$(document).ready(function() {
	$('#calendar').fullCalendar({
	        // put your options and callbacks here
	})

	login();
	
});

var test = function() {
	$.ajax({
		    type: "POST",
		    url: "http://api.reimaginebanking.com/accounts/" + "55e94a6cf8d8770528e6190a" + "/purchases?key=d7d568706156d07aed570d9ae78d97ab",
		    success: function(e) {
		      console.log(e);
		    }
	});
}

var tags = {"55fe05f9ce1cef140015e34f":"Food", "55fe064dce1cef140015e350":"Food", "55fe0679ce1cef140015e351":"Food", "55fe0687ce1cef140015e352":"Food", "55fe068bce1cef140015e353":"Food", "55fe06d4ce1cef140015e354":"Entertainment", "55fe08d8ce1cef140015e358":"Utilities"}

var login = function() {

	var userID = "55e94a6cf8d8770528e618dc";

	$.ajax({
		type: "GET",
		url: "http://api.reimaginebanking.com/accounts/" + userID + "/purchases?key=504b6724f21e8161fc5b1ddbcb07a55d"})
		.done(function(data){
			var html = '<table class="table">' + '<thead>' + 
		        '<td class="name">Transaction Name</td>' + 
		        '<td class="date">Date</td>' + 
		        '<td class="amount">Amount</td>' + 
		        '<td class="tags">Tags</td>' + 
		        '<td class="editTag">Edit Tag</td>' + 
		    '</thead>';

			for (var i=0; i<data.length; i++)
			{
				var temp_html = "<tr>";
				temp_html += "<td id='" + data[i]._id + "' class='name'>" + data[i].description + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='date'>" + data[i].purchase_date + "</td>"
				if (data[i].payee_id == userID){
					temp_html += "<td id='" + data[i]._id + "' class='amount positive'>" + data[i].amount + "</td>"	
				}
				else {
					temp_html += "<td id='" + data[i]._id + "' class='amount negative'>" + "-"+data[i].amount + "</td>"
				}
				temp_html += "<td id='" + data[i]._id + "' class='tags'>" + '<div class="tag">' + tags[data[i]._id] + '</div>' + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='editTag'>" + "+" + "</td>"
				temp_html += "</tr>";
				html += temp_html;
			}
			$("#transactions").html(html);
		});

	$.ajax({
		type: "GET",
		url: "http://api.reimaginebanking.com/accounts/" + userID + "/deposits?key=504b6724f21e8161fc5b1ddbcb07a55d"})
		.done(function(data){
			var html = "";
			for (var i=0; i<data.length; i++)
			{
				var temp_html = "<tr>";
				temp_html += "<td id='" + data[i]._id + "' class='name'>" + data[i].description + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='date'>" + data[i].transaction_date + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='amount positive'>" + data[i].amount + "</td>"	
				temp_html += "<td id='" + data[i]._id + "' class='tags'>" + '<div class="tag">' + tags[data[i]._id] + '</div>' + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='editTag'>" + "+" + "</td>"
				temp_html += "</tr>";
				html += temp_html;
			}
			html += "</table>";
			$("#transactions").append(html);
		});
}