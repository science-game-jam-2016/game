var Potato = function() {
	Plant.apply(this, arguments)
	this.name = "Potato"
	this.waterPerDay = 10 // TODO refine this value
	this.image = "/img/potato.jpg"
	this.dayGrowth = 4
}
