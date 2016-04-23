var Corn = function() {
	Plant.apply(this, arguments)
	this.name = "Corn"
	this.waterPerDay = 10 // TODO refine this value
	this.image = "/img/corn.png"
	this.dayGrowth = 2
}
