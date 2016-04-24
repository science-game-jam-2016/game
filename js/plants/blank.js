var Blank = function() {
	Plant.call(this);
	this.name = "blank"
	this.waterPerDay = 0
	this.image = ""
	this.dayGrowth = 0
}

Blank.prototype = Object.create(Plant.prototype);

Blank.prototype.constructor = Blank;