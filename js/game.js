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

Game.prototype.plantPlant = function(type, e) {
    this.plantGrid.pP(type, e);
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

Grid.prototype.pP = function(t, e) {
    var x = e.srcElement.attributes["data-x"].value;
    var y = e.srcElement.attributes["data-y"].value;
    console.log(t)
    switch (t) {
        case "Corn":
            this.setPlantAtLoc(x, y, new Corn())
            break;

        case "Rice":
            this.setPlantAtLoc(x, y, new Rice())
            break;

        case "Potato":
            this.setPlantAtLoc(x, y, new Potato())
            break;

        case "blank":
            this.setPlantAtLoc(x, y, new Blank())
            break;
    }
}

Grid.prototype.delPlant = function(e) {
    this.pP("blank", e)
}

Grid.prototype.draw = function() {
    this.c.innerHTML = ""
    var tmp = ""
    for (var i = 0; i < this.plants.length; i++) {
        for (var j = 0; j < this.plants[i].length; j++) {
            tmp += "<div id=\"plant-spot\" class=\"" + this.plants[i][j].name + " " + ((this.plants[i][j].name === "blank") ? "" : "planted") + "\" " + "data-x=" + j + " data-y=" + i + "></div>"
        }
        tmp += "<br>"
    }
    this.c.innerHTML = tmp

    var blanks = document.getElementsByClassName("blank");
    var that = this;
    for (var i = 0; i < blanks.length; i++) {
        blanks[i].addEventListener('click', function(e) {
            var newPlant = notifier.promptChoices("What plant would you like to plant there?", ["Corn", "Potato", "Rice"])
            that.pP(newPlant, e)
        }, false);
    }

    var planted = document.getElementsByClassName("planted");
    var that = this
    for (var i = 0; i < planted.length; i++) {
        planted[i].addEventListener('click', function(e) {
            var p = notifier.promptChoices("Would you like to remove that?", ["y", "n"])
            if (p === "y") { that.delPlant(e); } else { alert("Cancelled."); }
        }, false);
    }
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
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}
