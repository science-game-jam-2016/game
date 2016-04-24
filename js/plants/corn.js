var Corn = function() {
	Plant.call(this);
	this.name = "Corn"
	this.waterPerDay = 10 // TODO refine this value
	this.image = "/img/ear_of_yellow_corn.png"
	this.dayGrowth = 2
	this.profitPerDay = 10
	this.price = 5
	this.lifetime = this.dayGrowth + 3
}

Corn.prototype = Object.create(Plant.prototype);

Corn.prototype.constructor = Corn;
