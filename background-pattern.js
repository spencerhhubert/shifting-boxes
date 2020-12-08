function randomBoxMuller() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function boxMullerPositiveFloat() {
    return Math.abs(randomBoxMuller());
}

function randomPink() {
    let color = "rgb(255, 0, " + Math.floor(Math.random()*(250-80)+80) + ")";
    return color;
}

function generatePixel() {
    let pixel = {};
    pixel.squareSize = 8;
    pixel.horizontalMax = 32 * pixel.squareSize;
    pixel.verticalMax = 32 * pixel.squareSize;
    pixel.xCord = Math.floor(boxMullerPositiveFloat()*pixel.horizontalMax/pixel.squareSize) * pixel.squareSize;
    pixel.yCord = Math.floor(boxMullerPositiveFloat()*pixel.verticalMax/pixel.squareSize) * pixel.squareSize;
    pixel.color = randomPink();
    return pixel
}

let totalNumberOfPixels = 1280;

for(x=0; x<totalNumberOfPixels; x++) {
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