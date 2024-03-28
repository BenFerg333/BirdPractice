const BIRDNAMES = [["acorn_woodpecker", [1]], ["american_crow", [1,3]], ["annas_hummingbird", [1,2]], ["ash_throated_flycatcher", [1]], ["bewicks_wren", [3]], ["california_quail", [2]], ["california_towhee", [1,4]], 
	["hairy_woodpecker", [2]], ["mourning_dove", [1,2]], ["northern_flicker", [2]], ["olive_sided_flycatcher", [1]], ["red_shouldered_hawk", [1]], ["red_tailed_hawk", [1]], ["song_sparrow", [1,2]], ["spotted_towhee", [1,2]],
	["stellers_jay", [2,3]]];
var birdNames = BIRDNAMES.slice();
var count = 0;

console.log("Starting Javascript");
console.log("Bird Array:\n");
console.log(birdNames);

birdNames.forEach(function(currentValue, index, arr){
	$("select").append("<option value=\"" + currentValue[0] + "\">" + toTitleCase(currentValue[0].replace(/[_]/gi, " ")) + "</option>");
});

$("#start").on("click", function(){
	makeAudio(birdNames[count], [1]); //find way to index
	count++;
	if(count >= birdNames.length){
		count = 0;
	}
});
$("#normal").on("click", function(){
	birdNames = BIRDNAMES.slice();
	console.log("Original bird order: " + birdNames);
	count = 0;
});
$("#shuffle").on("click", function(){
	shuffle(birdNames);
	console.log("New bird order: " + birdNames);
});
$("#reveal").on("click", function(){
	$(".audio p").remove();
	if(count == 0){
		$(".audio").append("<p>No bird loaded</p>");
		console.log("Can't reveal bird name: no bird loaded");
	}
	else{
		$(".audio").append("<p>" + toTitleCase(birdNames[count - 1][0].replace(/[_]/gi, " ")) + "</p>");
	}
});

//from https://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
$('#form1').submit(function() {
    var $inputs = $('#form1 :input');

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    console.log(values.birds);
    for(var i = 0; i < birdNames.length; i++){
    	if(birdNames[i][0].match(values.birds)){
    		count = i+1;
    		makeAudio(birdNames[i]);
    	}
    }
});

var birdForm = $("#birds");
birdForm.onchange = formSubmit;

//from https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function formSubmit(){
	makeAudio(birdForm.value);
}

function makeAudio(name){
	console.log("Loading " + name[1].length + " Audio file(s) for " + name[0]);
	$(".audio").remove();
	var newDiv = "<div class=\"audio\" id=\"" + name[0] + "\">"
	for(var i = 0; i < name[1].length; i++){
		newDiv += "<audio controls><source src=\"Calls\\" + name[0] + "\\" + name[1][i] + ".mp3\" type=\"audio/mpeg\"></audio><br>";
	}
	newDiv += "</div>";
	$("#reveal").after(newDiv);
}

//Fisher-Yates Shuffle - https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
