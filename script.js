const canvas = document.getElementById("gamecanvas");
const scoreElm = document.getElementById("score")

const HEIGHT = document.body.offsetHeight;
const WIDTH = document.body.offsetWidth / 3;
let v = 1
let poeng = 0

canvas.height = HEIGHT;
canvas.width = WIDTH;

const ctx = canvas.getContext("2d");

const ship1 = {
    elm: document.getElementById("shipImg"),
    x: canvas.width / 2 - 25,
    y: document.body.offsetHeight - 100,
    bullets: [],
    health: 3
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
        enemies[i].y += 0.5 * v;
    }
    
    drawBullet(bullet1);
    checkCollision();
    checkShipCollision(); // Ensure this function is called
    checkOffscreen();
    gameOver();
    requestAnimationFrame(oppdater);
    bullet1.y -= 15;
    if (enemies.length == 0) {
        console.log("All enemies destroyed");
        v++;
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
    let scoreUpdated = false;
    for (let i = 0; i < ship1.bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (ship1.bullets[i].x >= enemies[j].x && ship1.bullets[i].x <= enemies[j].x + ship2.elm.width &&
                ship1.bullets[i].y >= enemies[j].y && ship1.bullets[i].y <= enemies[j].y + ship2.elm.height) {
                enemies[j].health--;
                if (enemies[j].health <= 0) { // Når man dreper en fiende
                    enemies.splice(j, 1);
                    j--;
                    console.log("Enemy destroyed");
                    console.log("Logging enemies array");
                    console.log(enemies);
                    poeng += v * 100;
                    scoreUpdated = true;
                }
                ship1.bullets.splice(i, 1);
                i--; // Adjust the index after removing the bullet
                j--; // Adjust the index after removing the enemy
                console.log("Hit");
                break; // Exit the inner loop to avoid further checks with the removed bullet
            }

        
        }
    }
    if (scoreUpdated) {
        scoreElm.innerHTML = "Score: " + poeng;
    }


}

function checkShipCollision() {
    for (let i = 0; i < enemies.length; i++) {
        /*console.log(`Checking collision for enemy at (${enemies[i].x}, ${enemies[i].y}) with ship at (${ship1.x}, ${ship1.y})`);*/
        if (enemies[i].x < ship1.x + ship1.elm.width &&
            enemies[i].x + ship2.elm.width > ship1.x &&
            enemies[i].y < ship1.y + ship1.elm.height &&
            enemies[i].y + ship2.elm.height > ship1.y) {
            ship1.health--;
            console.log("Ship hit");
            console.log("Ship health: " + ship1.health);
            // Optionally, remove the enemy or take other actions here
            enemies.splice(i, 1);
            i--; // Adjust the index after removing the enemy
        }
    }
}

function checkOffscreen() {
    for (let i = 0; i < enemies.length; i++) {
        if(enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
            console.log("Enemy offscreen")
            
        }
    }
}
const gameOverElm = document.getElementById("scoreFail");
const failElm = document.getElementById("failScreen");
function gameOver() {
    if (ship1.health <= 0) {
        failElm.style.display = "flex";
        gameOverElm.innerHTML = " Your score: " + poeng;
        v = 0
        
    }
}

function restart() {
    location.reload();
}

spawnEnemy(5);
oppdater();


