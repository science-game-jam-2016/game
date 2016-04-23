var Corn = function() {
	Plant.apply(this, arguments)
	this.name = "Corn"
	this.waterPerDay = 10 // TODO refine this value
	this.image = "/img/corn_310464.jpg"
	this.dayGrowth = 2
}
