var Game = function() {
    this.water = 100;
    this.money = 50;
    this.creekWater = 100;
    this.creekContaminated = false;
    this.day = 1;
    this.seeds = {
        corn: 0,
        potato: 0,
        rice: 0
    }
}

Game.prototype.initGrid = function() {
    var gridContainer = document.getElementById('plant-grid');
    this.plantGrid = new Grid(gridContainer, this)
    this.plantGrid.draw()
    this.refreshVars()

    function fn(e) {
        for (var i = tooltip.length; i--;) {
            tooltip[i].style.left = e.pageX + 'px';
            tooltip[i].style.top = e.pageY + 'px';
        }
    }
}

Game.prototype.refreshVars = function() {
    document.getElementById('day-meter').innerHTML = this.day;
    document.getElementById('water-meter').innerHTML = this.water;
    document.getElementById('money-meter').innerHTML = this.money;
}

Game.prototype.plantPlant = function(type, e) {
    this.plantGrid.pP(type, e);
    this.refreshVars()
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

var Grid = function(container, game) {
    this.g = game;
    this.c = container;
    this.x = 5;
    this.y = 5;
    this.plants = createArray(this.y, this.x);
    for (var i = this.plants.length - 1; i >= 0; i--) {
        for (var j = this.plants[i].length - 1; j >= 0; j--) {
            this.plants[i][j] = new Blank()
        }
    }
}

Grid.prototype.pP = function(t, e) {
    var elem = e.srcElement;
    if (elem.nodeName === "IMG") {
        elem = e.srcElement.parentNode;
    }
    console.log(elem)
    var x = elem.attributes["data-x"].value;
    var y = elem.attributes["data-y"].value;

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
            tmp += "<div id=\"plant-spot\" class=\"" + this.plants[i][j].name + " " + ((this.plants[i][j].name === "blank") ? "" : "planted") + " tooltip\" " + "data-x=" + j + " data-y=" + i + "><img class=\"plant-img\" src=" + this.plants[i][j].image + ">" + ((this.plants[i][j].name === "blank") ? "<span class=\"tooltip-content\">Empty</span>" : "<span class=\"tooltip-content\">" + this.plants[i][j].getDescription() + "</span>") + "</div>"
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
            var p = notifier.promptBool("Would you like to remove that?")
            if (p) { that.delPlant(e); } else { notify.info("Cancelled."); }
        }, false);
    }

    var tooltip = document.querySelectorAll('.tooltip-content');
    document.addEventListener('mousemove', fn, false);

    function fn(e) {
        for (var i = tooltip.length; i--;) {
            tooltip[i].style.left = e.pageX + 'px';
            tooltip[i].style.top = e.pageY + 'px';
        }
    }

    document.getElementById("creek-info").innerHTML = "<b>Creek</b><br>Generates " + this.g.creekWater + " per day.<br>Contaminated: " + this.g.creekContaminated
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

Game.prototype.nextDay = function() {
    this.water += this.creekWater;
    console.log(this.water);
    for (var i = 0; i < this.plantGrid.plants.length; i++) {
        for (var j = 0; j < this.plantGrid.plants[i].length; j++) {
            var plant = this.plantGrid.plants[i][j];
            if (plant.name !== "blank") {
                if (plant.mature) {
                    this.money += plant.profitPerDay;
                }
                this.water -= plant.waterPerDay;
                console.log(plant.waterPerDay)
                plant.nextDay()
            }
        }
    }
    this.day += 1
    this.plantGrid.draw();
    this.refreshVars();
    if (this.water <= 0) {
    	notifier.loss()
    }
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}
