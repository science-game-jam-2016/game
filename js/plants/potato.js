var Potato = function() {
	Plant.apply(this, arguments)
	this.name = "Potato"
	this.waterPerDay = 10 // TODO refine this value
	this.image = "/img/test.png"
	this.dayGrowth = 4
}
