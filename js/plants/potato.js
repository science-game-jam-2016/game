var Potato = function() {
	Plant.call(this);
	this.name = "Potato"
	this.waterPerDay = 10 // TODO refine this value
	this.image = "/img/potato.png"
	this.dayGrowth = 4
	this.profitPerDay = 10
}

Potato.prototype = Object.create(Plant.prototype);

Potato.prototype.constructor = Potato;