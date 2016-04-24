var Shop = function(g) {
    this.items = []
    this.e = document.getElementById('shop');
    this.g = g;
}

Shop.prototype.show = function() {
    this.e.className = "open"

    // this.e.style.transform = "scale(1)"
    // this.e.style.webkitTransform = "scale(1)"
    // var b = document.getElementById('shop-btn');
    // b.style["padding-right"] = "50px";
    //    b.style.border = "3px solid black";
    //    b.style["box-shadow"] = "0px 0px 50px black";
}

Shop.prototype.draw = function() {
    for (var i = 0; i < this.items.length; i++) {
        document.getElementById("shop-items").innerHTML += "<div id=\"shop-item\" data-item-index=" + i + " class=\"tooltip shop-item\"><img class=\"shop-img\" src=\"" + this.items[i].image + "\"><span class=\"tooltip-content\"><b>" + this.items[i].name + "</b><br>" + this.items[i].description + "</span></div>"
    }
    var blanks = document.getElementsByClassName("shop-item");
    var that = this;
    for (var i = 0; i < blanks.length; i++) {
        blanks[i].addEventListener('click', function(e) {
            that.buyItem(e)
        }, false);
    }
}

Shop.prototype.buyItem = function(e) {
    var elem = e.srcElement;
    if (elem.nodeName === "IMG") {
        elem = e.srcElement.parentNode;
    }
    console.log(elem)
    var item = this.items[parseInt(elem.attributes["data-item-index"].value)];

    if (this.g.money >= item.price) {
        this.g.money -= item.price;
        if (item.name === "Rainwater Collection System") {
        	if (this.g.rainwater) {
        		notifier.info("You already have one.");
        		return;
        	}
            this.g.rainwater = item;
            this.showRainwater()
        }

        this.g.plantGrid.draw()
        this.g.refreshVars()
    } else {
        notifier.info("You don't have enough money.")
    }

}

Shop.prototype.hide = function() {

    document.getElementById("shop").className = "closed"

    // var b = document.getElementById('shop-btn');
    // var c = document.getElementById('shop');

    // console.log(this.e.style.transform)
    // this.e.style.transform = "scale(0.5)"
    // this.e.style.webkitTransform = "scale(0.5)"
    // console.log(this.e.style.transform)
    // b.color = "red";
    // b.style["padding-right"] = "10px";
    //    b.style.border = "";
    //    b.style["box-shadow"] = "";
    // this.e.style.transform = "scale(0.5)"
    // this.e.style.webkitTransform = "scale(0.5)"

    // this.e.style.display = 'none';
    // this.e.style.display = 'block';


}

Shop.prototype.showRainwater = function() {
    document.getElementById("rainwater").style.display = "block";
}

var ShopItem = function() {

}

var RainwaterCollection = function() {
    ShopItem.call(this);
    this.name = "Rainwater Collection System"
    this.description = "Collects water from rain. Very sustainable but not always reliable.<br>Generates 50-100 water per day."
    this.price = 200;
    this.image = "/img/Rainwatercollection.png"
}

RainwaterCollection.prototype = Object.create(ShopItem.prototype);

RainwaterCollection.prototype.constructor = RainwaterCollection;

RainwaterCollection.prototype.getWater = function() {
    return (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 5;
}
