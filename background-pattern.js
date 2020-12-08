function randomPink() {
    let color = "rgb(255, 0, " + Math.floor(Math.random()*(150-100)+100) + ")";
    return color;
}

function randomCoordinates() {
    coordinates = [];
    squareSize = 10;
    horizontalMax = 20 * squareSize;
    verticalMax = 20 * squareSize;
    coordinates[0] = Math.floor(Math.random()*horizontalMax/squareSize) * squareSize;
    coordinates[1] = Math.floor(Math.random()*verticalMax/squareSize) * squareSize;
    return coordinates;
}

for(x=0; x<256; x++) {
    pixel = document.createElement('div');
    pixel.className = 'pixel'
    pixel.style.backgroundColor = randomPink()
    coordinates = randomCoordinates()
    pixel.style.left = coordinates[0] + "px";
    pixel.style.top = coordinates[1] + "px";
    document.getElementById('pixel-drip').appendChild(pixel)
}