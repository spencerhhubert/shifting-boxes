function randomPink() {
    let color = "rgb(255, 0, " + Math.floor(Math.random()*(250-80)+80) + ")";
    return color;
}

// function randomCoordinates() {
//     coordinates = [];
//     squareSize = 16;
//     horizontalMax = 50 * squareSize;
//     verticalMax = 40 * squareSize;
//     coordinates[0] = Math.floor(Math.random()*horizontalMax/squareSize) * squareSize;
//     coordinates[1] = Math.floor(Math.random()*verticalMax/squareSize) * squareSize;
//     return coordinates;
// }

function generatePixel() {
    let pixel = {};
    pixel.squareSize = 16;
    pixel.horizontalMax = 50 * pixel.squareSize;
    pixel.verticalMax = 50 * pixel.squareSize;
    pixel.xCord = Math.floor(Math.random()*pixel.horizontalMax/pixel.squareSize) * pixel.squareSize;
    pixel.yCord = Math.floor(Math.random()*pixel.verticalMax/pixel.squareSize) * pixel.squareSize;
    pixel.color = randomPink();
    return pixel
}

let totalNumberOfPixels = 1000;

for(x=0; x<1000; x++) {
    newPixel = generatePixel();
    pixelNode = document.createElement('div');
    pixelNode.className = 'pixel'
    pixelNode.style.backgroundColor = newPixel.color;
    pixelNode.style.left = newPixel.xCord + "px";
    pixelNode.style.top = newPixel.yCord + "px";
    pixelNode.style.width = newPixel.squareSize + "px";
    pixelNode.style.height = newPixel.squareSize + "px";
    pixelNode.addEventListener("mouseenter", function(event) {
        event.target.style.backgroundColor = randomPink();
    })
    document.getElementById('pixel-drip').appendChild(pixelNode)
}