var Rice = function() {
	Plant.call(this);
	this.name = "Rice"
	this.waterPerDay = 50 // TODO refine this value
	this.image = "/img/rice.png"
	this.dayGrowth = 5
	this.profitPerDay = 40
	this.price = 20
	this.lifetime = 10
}

Rice.prototype = Object.create(Plant.prototype);

Rice.prototype.constructor = Rice;
