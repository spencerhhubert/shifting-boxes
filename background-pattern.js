function randomBoxMuller() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function boxMullerPositiveFloat() {
    return Math.abs(randomBoxMuller());
}

function getRGBValueInRange(top, bottom) {
    return Math.floor(Math.random()*(top-bottom)+bottom)
}

function rawAttributeValue(attribute) {
    let result = attribute.slice(0,-2)
    result = parseInt(result, 10)
    return result
}

function randomPink() {
    let value1 = getRGBValueInRange(220, 255);
    let value2 = getRGBValueInRange(20, 90);
    let value3 = getRGBValueInRange(250, 120);
    return "rgb(" + value1 + ", " + value2 + ", " + value3 + ")";
}

function randomGray() {
    let value = getRGBValueInRange(16, 48);
    return "rgb(" + value + ", " + value + ", " + value + ")";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generatePixel() {
    let pixel = {};
    pixel.squareSize = 32;
    pixel.horizontalMax = 16 * pixel.squareSize;
    pixel.verticalMax = 16 * pixel.squareSize;
    pixel.xCord = Math.floor(boxMullerPositiveFloat()*pixel.horizontalMax/pixel.squareSize) * pixel.squareSize;
    pixel.yCord = Math.floor(boxMullerPositiveFloat()*pixel.verticalMax/pixel.squareSize) * pixel.squareSize;
    pixel.originDistance = Math.sqrt(pixel.xCord**2 + pixel.yCord**2)
    console.log(pixel.originDistance);
    pixel.color = randomPink();
    return pixel
}

let totalNumberOfPixels = 1000;

for(x=0; x<totalNumberOfPixels; x++) {
    newPixel = generatePixel();
    pixelNode = document.createElement('div');
    pixelNode.className = 'pixel'
    pixelNode.style.backgroundColor = newPixel.color;
    pixelNode.style.left = newPixel.xCord;
    pixelNode.style.top = newPixel.yCord;
    pixelNode.style.width = newPixel.squareSize + "px";
    pixelNode.style.height = newPixel.squareSize + "px";
    pixelNode.style.opacity = 1/(newPixel.originDistance/300);
    let currentZIndex = 2;

    pixelNode.addEventListener("mouseenter", function(event) {
        if (currentZIndex >= 128) {
            currentZIndex = 2;
        }
        currentZIndex++
        event.target.style.backgroundColor = randomPink();
        event.target.style.zIndex = currentZIndex;
    })

    pixelNode.addEventListener("mousedown", function(event) {
        event.target.remove()
        movePixelRandomWay(pixelNode, newPixel)
    })

    // pixelNode.addEventListener(setInterval(1000), function(event) {
    //     if (Math.random() < .5) {
    //         event.target.style.top = rawAttributeValue(event.target.style.top) + newPixel.squareSize;
    //     }
    // })

    // movePixelRandomWay(pixelNode, newPixel);

    document.getElementById('pixel-drip').appendChild(pixelNode)
}

function movePixelRandomWay(node, object) {
    let randomValue = Math.random();
    switch(randomValue) {
        case randomValue < .25:
            node.style.left = rawAttributeValue(node.style.left) + object.squareSize;
            break;
        case randomValue > .25 && randomValue < .5:
            node.style.top = rawAttributeValue(node.style.top) + object.squareSize;
            break;
        case randomValue > .5 && randomValue < .75:
            node.style.right = rawAttributeValue(node.style.right) + object.squareSize;
            break;
        case randomValue > .75 && randomValue < 1:
            node.style.top = rawAttributeValue(node.style.top) + object.squareSize;
            break;
    }
}