var Game = function() {
	this.water = 100;
	this.money = 50;
	this.day = 1;
	this.seeds = {
		corn: 0,
		potato: 0,
		rice: 0
	}
}

Game.prototype.initGrid = function() {
    gridContainer = document.getElementById('plant-grid');
    this.plantGrid = new Grid(gridContainer)
    this.plantGrid.draw()
}

Game.prototype.refreshVars = function() {
    document.getElementById('day-meter').text = "Day " + this.day;
}

Object.defineProperty(Game, "water", {
    get: function water() {
        return this.water
    },
    set: function water(a) {
        this.water = a;
        this.refreshVars()
    }
});

Object.defineProperty(Game, "day", {
    get: function day() {
        return this.day
    },
    set: function day(a) {
        this.day = a;
        this.refreshVars()
    }
});

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

Grid.prototype.setPlantAtLoc = function(x, y, p) {
	this.plants[y][x] = p;
	this.draw()
}

Object.defineProperty(Game, "plants", {
    get: function plants() {
        return this.plants
    },
    set: function plants(a) {
        this.plants = a;
        this.draw()
    }
});

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
