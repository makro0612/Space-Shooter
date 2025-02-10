const canvas = document.getElementById("gamecanvas");

const HEIGHT = document.body.offsetHeight;
const WIDTH = document.body.offsetWidth/3;

canvas.height = HEIGHT;
canvas.width = WIDTH;

const ctx = canvas.getContext("2d");

const ship1 = {
    elm: document.getElementById("shipImg"),
    x: canvas.width / 2 - 25,
    y: document.body.offsetHeight - 100,
    bullets: []
}

const bullet1 = {
    elm: document.getElementById("bulletImg"),
    x: ship1.x ,
    y: ship1.y,
    visible: false
}


function shoot() {
    ship1.bullets.push({
        x: ship1.x + 25,
        y: ship1.y,
        
    });
    console.log(ship1.bullets);
}

function drawShip(ship) {
    
    ctx.drawImage(ship.elm, ship.x, ship.y);
}

function drawBullet(bullet) {
        for (let i = 0; i < ship1.bullets.length; i++) {
            ctx.drawImage(bullet.elm, ship1.bullets[i].x, ship1.bullets[i].y);
            ship1.bullets[i].y -= 15;
        }
        
        
       
        
    }


function oppdater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip(ship1);
    drawBullet(bullet1);    
    requestAnimationFrame(oppdater);
    bullet1.y -= 15;
}

oppdater();

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        ship1.x -= 10;
    } else if (event.key === "ArrowRight") {
        ship1.x += 10;
    }
    else if (event.key === " ") {
        
        bullet1.x = ship1.x + 25;
        bullet1.y = ship1.y;
        shoot();
    }
    

});




