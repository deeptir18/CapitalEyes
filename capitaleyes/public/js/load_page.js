$(document).ready(function() {
	$('#calendar').fullCalendar({
	        // put your options and callbacks here
	})
	
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