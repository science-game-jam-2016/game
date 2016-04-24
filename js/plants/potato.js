var Potato = function() {
	Plant.call(this);
	this.name = "Potato"
	this.waterPerDay = 20 // TODO refine this value
	this.image = "/img/potato.png"
	this.dayGrowth = 4
	this.profitPerDay = 30
	this.price = 10
	this.lifetime = this.dayGrowth + 5
}

Potato.prototype = Object.create(Plant.prototype);

Potato.prototype.constructor = Potato;
