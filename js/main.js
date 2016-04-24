g = new Game()

g.initGrid()

g.plantGrid.setPlantAtLoc(0, 0, new Corn())
g.plantGrid.setPlantAtLoc(1, 0, new Corn())
g.plantGrid.setPlantAtLoc(2, 0, new Corn())
//g.show_popup()

document.getElementById('next').onclick = function() {
	g.nextDay();
}

document.getElementById('shop').onclick = function() {
	g.openShop();
}

document.getElementsByTagName('body')[0].onclick = function(e) {
	console.log(e)
	if (e.srcElement.id.indexOf("shop") < 0) {
		g.closeShop();
	}
	if (e.srcElement.id === "game-frame" < 0) {
		document.getElementById("new-plant").className = "closed"
	}
}

document.getElementById('start').onclick = function() {
	document.getElementById('start').className = "closed-alt";
}