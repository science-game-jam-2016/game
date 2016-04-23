var Rice = function() {
	Plant.apply(this, arguments)
	this.name = "Rice"
	this.waterPerDay = 50 // TODO refine this value
	this.image = "/img/test.png"
}
