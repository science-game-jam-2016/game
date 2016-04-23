var Game = function() {

}

Game.prototype.initGrid = function() {
    gridContainer = document.getElementById('plant-grid');
    this.plantGrid = new Grid(gridContainer)
    this.plantGrid.draw()
}

var Grid = function(container) {
	this.c = container;
	this.x = 3;
	this.y = 5;
	this.plants = createArray(this.y, this.x);
	for (var i = this.plants.length - 1; i >= 0; i--) {
		for (var j = this.plants[i].length - 1; j >= 0; j--) {
			this.plants[i][j] = new Blank()
		}
	}
}

Grid.prototype.draw = function() {
	this.c.innerHTML = ""
	var tmp = ""
	for (var i = 0; i < this.plants.length; i++) {
		for (var j = 0; j < this.plants[i].length; j++) {
			tmp += "<div id=\"plant-spot\" class=\"" + this.plants[i][j].name + "\"></div>"
		}
		tmp += "<br>"
	}
	this.c.innerHTML = tmp
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
