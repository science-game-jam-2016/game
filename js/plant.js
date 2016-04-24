var Plant = function () {
	this.day = 0;
	this.mature = false;
};

Plant.prototype.getDescription = function() {
	return this.description = "<b>" + this.name + "</b><br>Uses " + this.waterPerDay + " water per day.<br>Generates $" + this.profitPerDay + " per day.<br>" + (this.mature ? "Mature." : (this.dayGrowth - this.day + " days to mature."))
};

Plant.prototype.nextDay = function() {
	this.day += 1;
	this.mature = this.dayGrowth <= this.day
}