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

class Pixel {
    constructor(node) {
        this.size = 20;
        this.shiftX = 200;
        this.shiftY = 200;
        this.horizontalMax = 16 * this.size
        this.verticalMax = 16 * this.size
        this.color = randomPink();
        this.zIndex = 2;

        this.xCord = 0;
        this.yCord = 0;

        while(this.xCord < this.shiftX) {
            this.xCord = Math.floor(boxMullerPositiveFloat()*this.horizontalMax/this.size) * this.size;
        }

        while(this.yCord < this.shiftY) {
            this.yCord = Math.floor(boxMullerPositiveFloat()*this.verticalMax/this.size) * this.size;
        }

        this.originDistance = Math.sqrt(this.xCord**2 + this.yCord**2);

        this.node = node;

        this.node.className = "pixel";
        this.node.style.backgroundColor = this.color;
        this.node.style.top = this.xCord;
        this.node.style.left = this.yCord;
        this.node.style.width = this.size;
        this.node.style.height = this.size;
        this.node.style.zIndex = this.zIndex;
        this.node.style.opacity = 1/(this.originDistance/300);

        this.node.addEventListener("mousedown", function(event) {
            event.target.remove();
        })
        
        this.node.addEventListener("mouseenter", function(event) {
            event.target.style.backgroundColor = randomPink();
            event.target.style.zIndex = parseInt(event.target.style.zIndex, 10) + 1;
        })
        // setInterval(this.banana, Math.random() * 50000 + 1000);
    }

    moveUp(times) {
        for (let i=0; i<times; i++) {
            this.xCord -= this.size;
            this.node.style.top = this.xCord;
        }
    }
    moveDown(times) {
        for (let i=0; i<times; i++) {
            this.xCord += this.size;
            this.node.style.top = this.xCord;
        }     
    }
    moveRight(times) {
        for (let i=0; i<times; i++) {
            this.yCord += this.size;
            this.node.style.left = this.yCord;
        }
    }
    moveLeft(times) {
        for (let i=0; i<times; i++) {
            this.yCord -= this.size;
            this.node.style.left = this.yCord;
        }
    }
    changeColor(color) {
        this.color = color;
        this.node.style.backgroundColor = this.color;
    }
    changeSize(size) {
        this.size = size;
        this.node.style.width = this.size;      
        this.node.style.height = this.size;
    }
    increaseZ() {
        this.zIndex += 1;
        if (this.zIndex >= 128) {
            this.zIndex = 2;
        }
        this.node.style.zIndex = 10;
    }
    pickRandomDirection() {
        let randomValue = Math.random();
        if(randomValue >= 0 && randomValue < .25) {
            return "up";
        }
        if(randomValue >= .25 && randomValue < .5) {
            return "right";
        }
        if(randomValue >= .5 && randomValue < .75) {
            return "down";
        }
        if(randomValue >= .75 && randomValue < 1) {
            return "left";
        }
    }
    move(direction) {
        switch(direction) {
            case "up":
                this.moveUp(1);
                break;
            case "right":
                this.moveRight(1);
                break;
            case "down":
                this.moveDown(1);
                break;
            case "left":
                this.moveLeft(1);
                break;
        }
    }
}

let totalNumberOfPixels = 250;
let dripNode = document.getElementById('pixel-drip');

for(x=0; x<totalNumberOfPixels; x++) {
    pixelNode = document.createElement('div');
    let pixel = new Pixel(pixelNode);

    setInterval(() => {
        if (Math.random() < .05) {
            let direction = pixel.pickRandomDirection()
            pixel.move(direction)
        }
    }, Math.random() * 50000 + 1000);

    dripNode.appendChild(pixelNode);

    if(x==0) {
        dripNode.style.left = pixel.shiftX * -1;
        dripNode.style.top = pixel.shiftY * -1;
    }
}