const canvas = document.getElementById("gamecanvas");

const HEIGHT = document.body.offsetHeight;
const WIDTH = document.body.offsetWidth / 3;

canvas.height = HEIGHT;
canvas.width = WIDTH;

const ctx = canvas.getContext("2d");

const ship1 = {
    elm: document.getElementById("shipImg"),
    x: canvas.width / 2 - 25,
    y: document.body.offsetHeight - 100,
    bullets: []
}

const ship2 = {
    elm: document.getElementById("enemyImg"),
    x: 0,
    y: 0,
    bullets: [],
    health: 3
}

const bullet1 = {
    elm: document.getElementById("bulletImg"),
    x: ship1.x + 20,
    y: ship1.y,
    
}

const enemies = [];

function spawnEnemy(n) {
    const enemyWidth = ship2.elm.width; // Assuming all enemies have the same width
    const spacing = (canvas.width - (n * enemyWidth)) / (n + 1); // Calculate the spacing between enemies
    const startX = spacing; // Starting x position

    for (let i = 0; i < n; i++) {
        enemies.push({
            x: startX + i * (enemyWidth + spacing), // Position each enemy evenly spaced and centered
            y: 0,
            health: 3
        });
    }
    console.log(n + " Enemies " + enemies);
}

function shoot() {
    ship1.bullets.push({
        x: ship1.x + 14,
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
    for (let i = 0; i < enemies.length; i++) {
        ctx.drawImage(ship2.elm, enemies[i].x, enemies[i].y);
        /*enemies[i].y += 1;*/
    }
    
    drawBullet(bullet1);
    checkCollision();
    requestAnimationFrame(oppdater);
    bullet1.y -= 15;
    if(enemies.length == 0) {
        console.log("All enemies destroyed");
        spawnEnemy(5);
    }
}



document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && ship1.x > 10) {
        ship1.x -= 10;
        /*console.log(ship1.x);*/
    } else if (event.key === "ArrowRight" && ship1.x < canvas.width - 56) {
        ship1.x += 10;
        /*console.log(ship1.x);*/
    } else if (event.key === " ") {
        bullet1.x = ship1.x + 25;
        bullet1.y = ship1.y;
        shoot();
    }
});

function checkCollision() {
    for (let i = 0; i < ship1.bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (ship1.bullets[i].x >= enemies[j].x && ship1.bullets[i].x <= enemies[j].x + ship2.elm.width &&
                ship1.bullets[i].y >= enemies[j].y && ship1.bullets[i].y <= enemies[j].y + ship2.elm.height) {
                enemies[j].health--;
                if (enemies[j].health <= 0) {
                    enemies.splice(j, 1);
                    j--;
                    console.log("Enemy destroyed");
                    console.log("Logging enemies array");
                    console.log(enemies);
                }
                ship1.bullets.splice(i, 1)
                i--; // Adjust the index after removing the bullet
                j--; // Adjust the index after removing the enemy
                console.log("Hit");
                break; // Exit the inner loop to avoid further checks with the removed bullet
            }
        }
    }
}

spawnEnemy(5);
oppdater();


