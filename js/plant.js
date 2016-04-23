var Plant = function () {

};

Plant.prototype.getDescription = function() {
	return this.description = this.name + " plant. Uses " + this.waterPerDay + " water per day."
};