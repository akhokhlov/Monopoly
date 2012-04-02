function Creature() {

	this.x = 30;
	this.y = 50;
	this.colorRed = 0;
	this.colorGreen = 0;
	this.colorBlue = 0;
	this.xspeed = 2;
	this.yspeed = 3;
	this.size = 20;
	this.status = 1;
	this.maxage = 500;
	this.currentAge = 0;
	this.id = "thisId";

	this.bouncex = function() {
		this.xspeed = -1 * this.xspeed;
	};
	this.bouncey = function() {
		this.yspeed = -1 * this.yspeed;
	};

	this.die = function() {

		this.status = 0;
		grid[this.x][this.y] = -1;

		this.xspeed = 0;
		this.yspeed = 0;
		this.size = 0;
		theDiv = document.getElementById(this.id);
		theDiv.style.backgroundColor = "white";
		theDiv.style.border = "0px";

		// document.getElementById("environment").removeChild(
		// document.getElementById(this.id));
		// creatureList = creatureList.splice(this.gridIndex, 1);
	};

	this.move = function() {
		if (this.status == 0)
			return;
		this.currentAge++;

		grid[this.x][this.y] = -1;

		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;

		if ((this.x + this.size) > maxWidth) {
			this.x = maxWidth - this.size;
			this.bouncex();
		} else if (this.x < 0) {
			this.x = 0;
			this.bouncex();
		} else if ((this.y + this.size) > maxHeight) {
			this.y = maxHeight - this.size;
			this.bouncey();
		} else if (this.y < 0) {
			this.y = 0;
			this.bouncey();
		}

		this.renderAt(this.x, this.y);
		if (elapsedTurns > 50) {
			this.checkForPartner();
		}
	};

	this.renderAt = function(xpos, ypos) {
		if (this.currentAge % 3 == 0) {
			this.colorBlue = this.growPale(this.colorBlue);
			this.colorGreen = this.growPale(this.colorGreen);
			this.colorRed = this.growPale(this.colorRed);
			if (this.colorBlue == 255 && this.colorGreen == 255
					&& this.colorRed == 255) {
				this.die();
				return;
			}
		}
		theDiv = document.getElementById(this.id);
		theDiv.style.left = this.x;
		theDiv.style.top = this.y;
		theDiv.style.backgroundColor = "rgb(" + this.colorRed + ", "
				+ this.colorGreen + "," + this.colorBlue + ")";

		grid[this.x][this.y] = this.gridIndex;
	};

	this.growPale = function(color) {
		color++;
		if (color > 255)
			color = 255;
		return color;
	};

	this.createAt = function(idString, gridIdx, xpos, ypos, theSize, redLevel,
			greenLevel, blueLevel, xspeedLevel, yspeedLevel) {

		this.id = idString;
		this.gridIndex = gridIdx;
		this.x = xpos;
		this.y = ypos;
		this.size = theSize;

		this.colorRed = redLevel;
		this.colorGreen = greenLevel;
		this.colorBlue = blueLevel;

		this.xspeed = xspeedLevel;
		this.yspeed = yspeedLevel;

		theDiv = document.createElement('div');
		theDiv.setAttribute('id', this.id);

		theEnv = document.getElementById("environment");
		theEnv.appendChild(theDiv);

		theDiv = document.getElementById(this.id);
		theDiv.style.position = "absolute";
		theDiv.style.left = this.x + "px";
		theDiv.style.top = this.y + "px";
		theDiv.style.border = "2px solid red";
		theDiv.style.height = this.size;
		theDiv.style.width = this.size;

		theDiv.style.backgroundColor = "rgb(" + this.colorRed + ", "
				+ this.colorGreen + "," + this.colorBlue + ")";

		creatureList[this.gridIndex] = this;
		grid[this.x][this.y] = this.gridIndex;

	};

	this.breedWith = function(otherCreature) {

		elapsedTurns = 0;

		babyxspeed = this.getNewValue(this.xspeed, otherCreature.xspeed, -20,
				20);
		babyyspeed = this.getNewValue(this.yspeed, otherCreature.yspeed, -20,
				20);
		babysize = this.getNewValue(this.size, otherCreature.size, 0, 100);
		babycolorred = this.getNewValue(this.colorRed, otherCreature.colorRed,
				0, 100);
		babycolorgreen = this.getNewValue(this.colorGreen,
				otherCreature.colorGreen, 0, 100);
		babycolorblue = this.getNewValue(this.colorBlue,
				otherCreature.colorBlue, 0, 100);

		baby = new Creature();

		index = creatureList.length;

		baby.createAt("index" + index, index, this.x, this.y, babysize,
				babycolorred, babycolorgreen, babycolorblue, babyxspeed,
				babyyspeed);

	};

	this.checkForPartner = function() {

		xmax = this.x + size;
		if (this.x + size > maxWidth) {
			xmax = maxWidth;
		}

		ymax = this.y + size;
		if (this.y + size > maxHeight) {
			ymax = maxHeight;
		}

		for ( var xtocheck = this.x; xtocheck < xmax; xtocheck++) {
			for ( var ytocheck = this.y; ytocheck < ymax; ytocheck++) {
				if (grid[xtocheck][ytocheck] != -1
						&& grid[xtocheck][ytocheck] != this.gridIndex) {

					this.breedWith(creatureList[grid[xtocheck][ytocheck]]);
					break;
				}
			}
		}

	};

	this.getNewValue = function(old1, old2, min, max) {
		if (old1 < old2) {
			low = old1;
			high = old2;
		} else {
			low = old2;
			high = old1;
		}

		low = low - Math.round(min * .15) - Math.abs(min * .1);
		high = high + Math.round(high * .15);

		if (low < min) {
			low = min;
		}
		if (high > max) {
			high = max;
		}

		spread = high - low;
		offset = Math.round(Math.random() * spread);
		return low + offset;
	};

}
