var elapsedTurns = 0;

var ison = true;
var maxSize = 100;
var maxWidth = 600;
var maxHeight = 500;

var theCreature;
var theCreature2;

var interval = 100;
var creatureList = new Array();
var grid = new MultiDimensionalArray(maxWidth, maxHeight);
var fields = new Array();



function rand(maxNum) {
	return Math.round(maxNum * Math.random());
}

function createNewEnvironment() {
	fields.push(new Field(0, 0, 77, 77));
	
	
	
	
	size = 50;
	creatureList[0] = new Creature();
	creatureList[0].createAt("thisId1", 0, rand(maxWidth - size),
			rand(maxHeight - size), size, rand(255), rand(255), rand(255), -10
					+ rand(20), -10 + rand(20));
	size = 50;
	creatureList[1] = new Creature();
	creatureList[1].createAt("thisId2", 1, rand(maxWidth - size),
			rand(maxHeight - size), size, rand(255), rand(255), rand(255), -10
					+ rand(20), -10 + rand(20));

	setTimeout("nextTurn()", interval);

}

function nextTurn() {

	for ( var thisCreatureIndex = 0; thisCreatureIndex < creatureList.length; thisCreatureIndex++) {

		creatureList[thisCreatureIndex].move();
	}

	if (ison) {
		setTimeout("nextTurn()", interval);
	}
	elapsedTurns++;
}
