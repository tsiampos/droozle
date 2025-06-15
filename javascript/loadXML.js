$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "xml/questions.xml",
		dataType: "xml",
		success: function(xml){
		    var questions = [];
			var random = Math.floor(Math.random() * 257);
			questions.push(random);
			var sText = $(xml).find('text').eq(random).text();
			var sOptionA = $(xml).find('optionA').eq(random).text();
			var sOptionB = $(xml).find('optionB').eq(random).text();
			$('#description').val(sText);
			$('#choiceA').html(sOptionA);
			$('#choiceB').html(sOptionB);
			//console.log(questions);
			$('#questions').val(questions.join());
		},
		error: function() {
		alert("An error occurred while processing XML file.");
		}
	});
});

function reply_click(clicked_id,questions) {
    $(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "xml/questions.xml",
		dataType: "xml",
		success: function(xml){
			   if ($(xml).find("correct").text().includes(clicked_id)) {
  
				 document.getElementById("score").value = (parseInt(document.getElementById("score").value) + 2000).toFixed(5);
			   }
			   else {
				 document.getElementById("score").value = (parseInt(document.getElementById("score").value) - 1000).toFixed(5);
				 if (document.getElementById("score").value < 0) {
				   document.getElementById("score").value = parseInt(0).toFixed(5);
				 }
			   }

			var flag = 0;
			var updatedArray = questions.split(',');
			//console.log(updatedArray);
			if (updatedArray.length == 257) {
			    updatedArray = [];
			}
			function getRand() {
				var rand = Math.floor(Math.random() * 257);
				//console.log(rand);
				if ($.inArray(rand.toString(), updatedArray) === -1) {
					return rand;
				} else {
					return getRand();
				}
			}

			var random = getRand();
			updatedArray.push(parseInt(random));
			var sText = $(xml).find('text').eq(random).text();
			var sOptionA = $(xml).find('optionA').eq(random).text();
			var sOptionB = $(xml).find('optionB').eq(random).text();
			$('#description').val(sText);
			$('#choiceA').html(sOptionA);
			$('#choiceB').html(sOptionB);
			$('#questions').val(updatedArray.join());
		},
		error: function() {
		alert("An error occurred while processing XML file.");
            }
        });
    });
}