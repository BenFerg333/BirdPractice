const BIRDNAMES = [["acorn_woodpecker", [1]], ["american_crow", [1,3]], ["annas_hummingbird", [1,2]], ["ash_throated_flycatcher", [1]], ["bewicks_wren", [3]], ["california_quail", [2]], ["california_towhee", [1,4]], 
	["hairy_woodpecker", [2]], ["mourning_dove", [1,2]], ["northern_flicker", [2]], ["olive_sided_flycatcher", [1]], ["red_shouldered_hawk", [1]], ["red_tailed_hawk", [1]], ["song_sparrow", [1,2]], ["spotted_towhee", [1,2]],
	["stellers_jay", [1,2]]];
var birdNames = BIRDNAMES.slice();
var count = 0;

console.log("Starting Javascript");
console.log(birdNames);

birdNames.forEach(function(currentValue, index, arr){
	$("select").append("<option value=\"" + currentValue[0] + "\">" + currentValue[0] + "</option>");
});

$("#start").on("click", function(){
	makeAudio(birdNames[count], [1]); //find way to index
	count++;
});
$("#normal").on("click", function(){
	birdNames = BIRDNAMES.slice();
	console.log("Original bird order: " + birdNames);
});
$("#shuffle").on("click", function(){
	shuffle(birdNames);
	console.log("New bird order: " + birdNames);
});
$("#reveal").on("click", function(){
	$(".audio p").remove();
	$(".audio").append("<p>" + birdNames[count - 1][0] + "</p>")
});

//$("option").on()

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