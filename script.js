const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const player = {
    x: canvas.Width/2,
    y: canvas.height - 100,
    Width: 50,
    Height: 50,
    speed: 10,
    bullets: [],
}