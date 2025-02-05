const canvas = document.getElementById("gamecanvas")

const HEIGHT = 500
const WIDTH = 700

canvas.height = HEIGHT
canvas.width = WIDTH

const ctx = canvas.getContext("2d") 
const ship = document.getElementById("shipImg");


skip = ctx.drawImage(ship, (canvas.width/2)-35, 450);


/*max-width: 100%;
    height: auto;
    z-index: 100
*/
