g = new Game()

g.initGrid()
g.show_popup()
g.plantGrid.setPlantAtLoc(0, 0, new Corn())
g.plantGrid.setPlantAtLoc(1, 0, new Corn())
g.plantGrid.setPlantAtLoc(2, 0, new Corn())

document.getElementById('next').onclick = function() {
	g.nextDay();
}

document.getElementById('shop').onclick = function() {
	g.openShop();
}
