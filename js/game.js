var Game = function() {
    this.water = 100;
    this.money = 50;
    this.creekWater = 100;
    this.creekContaminated = false;
    this.rainwater = false;
    this.day = 1;
    this.seeds = {
        corn: 0,
        potato: 0,
        rice: 0
    }
    this.shop = new Shop(this)
}

Game.prototype.initGrid = function() {
    var gridContainer = document.getElementById('plant-grid');
    this.plantGrid = new Grid(gridContainer, this)
    this.plantGrid.draw()
    this.refreshVars()

    function fn(e) {
        for (var i = tooltip.length; i--;) {
            if (e.id === "rainwater") {
                tooltip[i].style.left = '0px';
                tooltip[i].style.top = '0px';
                return;
            }
            tooltip[i].style.left = e.pageX + 'px';
            tooltip[i].style.top = e.pageY + 'px';
        }
    }
    this.shop.items.push(new RainwaterCollection());
    this.shop.draw();
    var that = this;
    document.getElementById('shop-btn').onclick = function() {
        that.shop.show();
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
            var p = new Corn();
            break;

        case "Rice":
            var p = new Rice()
            break;

        case "Potato":
            var p = new Potato()
            break;

        case "blank":
            var p = new Blank()
            this.setPlantAtLoc(x, y, p);
            break;
    }
    if (p.name === "blank") {
        return;
    }
    if (this.g.money > p.price) {
        this.g.money -= p.price;
        this.setPlantAtLoc(x, y, p);
        this.g.refreshVars();
    } else {
        notifier.info("You can't buy that, it's too expensive. ")
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
            that.pP(newPlant, e);
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
            if (e.srcElement.id.indexOf("shop") > 0) {
                tooltip[i].style.left = '10px';
                tooltip[i].style.top = '10px';
                console.log("yo")
                return;
            }
            if (e.id === "rainwater") {
                tooltip[i].style.left = '0px';
                tooltip[i].style.top = '0px';
            }
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

    if (this.rainwater) {
        this.water += this.rainwater.getWater()
    }

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
                if (plant.day > plant.lifetime) {
                    this.plantGrid.plants[i][j] = new Blank();
                }
            }
        }
    }
    this.day += 1
    this.plantGrid.draw();
    this.refreshVars();
    if (this.water <= 0) {
        notifier.loss()
    }

    document.getElementById("white").className = "white-visible"

    setTimeout(function() {
        document.getElementById("white").className = "white-inv"
    }, 1000)
}

Game.prototype.openShop = function() {
    this.shop.show()
}

Game.prototype.closeShop = function() {
    document.getElementById("shop").className = "closed";
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
