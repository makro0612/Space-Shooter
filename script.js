const canvas = document.getElementById("gamecanvas");

const HEIGHT = 500;
const WIDTH = 700;

canvas.height = HEIGHT;
canvas.width = WIDTH;

const ctx = canvas.getContext("2d");
const ship = document.getElementById("shipImg");

function draw(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(ship, x, y);
    requestAnimationFrame(() => draw(x, y));
}
shipxx = 0


draw((canvas.width / 2) - 35, 450);

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        shipxx = shipxx - 10
        draw((canvas.width / 2) - 35 + shipxx, 450);
        console.log(shipxx)
    } else if (event.key === "ArrowRight") {
        shipxx += 10
        draw((canvas.width / 2) - 35 + shipxx, 450);
    }
    if(shipxx < -310){
        console.log("Game Over")
        canvas.style.backgroundColor = "red";
    }

});

