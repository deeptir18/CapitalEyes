var transactions;
var events = [];

var login = function() {

	var userID = "55e94a6cf8d8770528e618dc";
	html = '<table class="table">' + '<thead id="theadspecial">' + 
		        '<td class="pls name">Transaction Name</td>' + 
		        '<td class="pls date">Date</td>' + 
		        '<td class="pls amount">Amount</td>' + 
		        '<td class="pls tags">Tags</td>' + 
		        // '<td class="editTag">Edit Tag</td>' + 
		    '</thead>';
	transactions = [];

	$.ajax({
		type: "GET",
		url: "http://api.reimaginebanking.com/accounts/" + userID + "/purchases?key=504b6724f21e8161fc5b1ddbcb07a55d"})
		.done(function(data){
			for (var i=0; i<data.length; i++)
			{
				var temp_html = "<tr class='pls'>";
				temp_html += "<td id='" + data[i]._id + "' class='pls name'>" + data[i].description + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='pls date'>" + data[i].purchase_date + "</td>"
				balance -= data[i].amount;
				temp_html += "<td id='" + data[i]._id + "' class='pls amount negative'>" + "-$"+data[i].amount + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='pls tags'>" + '<div class="tag">' + tags[data[i]._id] + '</div>' + "</td>"
				temp_html += "</tr>";
				transactions.push({"date":data[i].purchase_date, "html":temp_html})
				events.push({"title":data[i].description + ", " + "-$"+data[i].amount, "start":new Date(data[i].purchase_date), "backgroundColor":"#E74C3C", "borderColor":"transparent", "className":"neg"})
			}
		});

	$.ajax({
		type: "GET",
		url: "http://api.reimaginebanking.com/accounts/" + userID + "/deposits?key=504b6724f21e8161fc5b1ddbcb07a55d"})
		.done(function(data){
			for (var i=0; i<data.length; i++)
			{
				var temp_html = "<tr class='pls'>";
				temp_html += "<td id='" + data[i]._id + "' class='pls name'>" + data[i].description + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='pls date'>" + data[i].transaction_date + "</td>"
				temp_html += "<td id='" + data[i]._id + "' class='pls amount positive'>$" + data[i].amount + "</td>"	
				balance += data[i].amount;
				temp_html += "<td id='" + data[i]._id + "' class='pls tags'>" + '<div class="tag">' + "Income" + '</div>' + "</td>"
				temp_html += "</tr>";
				transactions.push({"date":data[i].transaction_date, "html":temp_html})
				events.push({"title":data[i].description + ", " + "-$"+data[i].amount, "start":new Date(data[i].transaction_date), "backgroundColor":"#29CCB9", "borderColor":"transparent", "className":"pos"})
			}
			transactions.sort(function(a,b){
  				return new Date(b.date) - new Date(a.date);
			});

			for (var i=0; i<transactions.length; i++) {
				html += transactions[i].html;
			}

			html += "</table>";
			if (balance > 0) {
				balhtml = "<span class='positive'>$" + Math.round(balance * 100) / 100 + "</span>"	
			} else {
				balhtml = "<span class='negative'>" + Math.round(balance * 100) / 100 + "</span>"	
			}
			
			$("#transactions").append(html);
			$(".balanceval").html(balhtml);

			$('#calendar').fullCalendar({
	        // put your options and callbacks here
		        events: events,
		        allDayDefault: true
			})
		});
}

// $(document).ready(function() {
// 	$('#calendar').fullCalendar({
// 	        // put your options and callbacks here
// 	        events: events,
// 	        color: "yellow",
// 	        textColor: "black"
// 	})
	
// });


var tags = {"55fe05f9ce1cef140015e34f":"Food", "55fe064dce1cef140015e350":"Food", "55fe0679ce1cef140015e351":"Food", "55fe0687ce1cef140015e352":"Food", "55fe068bce1cef140015e353":"Food", "55fe06d4ce1cef140015e354":"Entertainment", "55fe08d8ce1cef140015e358":"Utilities", "55fe38dace1cef140015e3b4":"Income", "55fe3965ce1cef140015e3b5":"Income", "55fe3997ce1cef140015e3b6":"Income"}
