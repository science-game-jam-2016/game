var Shop = function() {
    this.items = []
    this.e = document.getElementById('shop');
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
        document.getElementById("shop-items").innerHTML += "<div id=\"shop-item\" class=\"tooltip\"><img class=\"shop-img\" src=\"" + this.items[i].image +  "\"><span class=\"tooltip-content\"><b>" + this.items[i].name + "</b><br>" + this.items[i].description + "</span></div>"
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

var ShopItem = function() {

}

var RainwaterCollection = function() {
    ShopItem.call(this);
    this.name = "Rainwater Collection System"
    this.description = "Collects water from rain. Very sustainable but not always reliable.<br>Generates 50-100 water per day."
    this.price = 200;
    this.image = "/img/Rainwatercollection.png"
}

RainwaterCollection.prototype.getWater = function() {
    return (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 5;
}

RainwaterCollection.prototype = Object.create(ShopItem.prototype);

RainwaterCollection.prototype.constructor = RainwaterCollection;
