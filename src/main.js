let collectionData = [];
let thumbs = [];
let tokenList = [];

let tokenBalance;
let donatedBalance;
let updalpha = 255;

let bfont, lfont;
let logo;
let rndChar1 = "_";
let rndChar2 = "_";
let rndChar3 = "_";
const chars = `!@#$%^&*()_+{}:|?><';[].,/`

function preload() {
    bfont = loadFont("../assets/IBMPlexMono-BoldItalic.ttf");
    lfont = loadFont("../assets/IBMPlexMono-LightItalic.ttf");
    logo = loadImage("../assets/terrain-logo-blk-small.png");
}
function setup() {
    let canvasDiv = document.getElementById('myCanvas');
    let w = canvasDiv.offsetWidth;
    let sketchCanvas = createCanvas(w, w / 2);
    sketchCanvas.parent("myCanvas");

    fetchToken();
}

function draw() {
    clear();
    
    stroke(0);
    line(0,1,width,1);
        
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        noStroke();
        textSize(10);

        fill(0);
        textFont(bfont);
        text(`Live token status:`, 10, 10);

        
        fill(0);

        if (frameCount % 30 == 0 || frameCount % int(random(10, 200)) == 0) {
            rndChar1 = chars[int(random(chars.length - 1))];
        }
        if (frameCount % 120 == 0 || frameCount % int(random(30, 50)) == 0) {
            rndChar2 = chars[int(random(chars.length - 1))];
        }
        if (frameCount % 2 == 0 || frameCount % int(random(3, 5)) == 0) {
            rndChar3 = chars[int(random(chars.length - 1))];
        }
        textFont(lfont);
        textSize(10);
        text(`
Minted tokens: ${1000 - tokenBalance} 
Remaining tokens: ${tokenBalance} 
Donated amount: ${donatedBalance} xtz
processing ..${rndChar1}${rndChar2}${rndChar1}${rndChar3}
`, 10, 40);

    } else {
        noStroke();
        textSize(20);


        fill(0);
        textFont(bfont);
        text(`Live token status:`, 30, 30);

        fill(0, 100, 90, updalpha);
        text("updating token data from fx-hash...", 30, 60);
        if (updalpha > 0) updalpha--;

        fill(0);

        if (frameCount % 30 == 0 || frameCount % int(random(10, 200)) == 0) {
            rndChar1 = chars[int(random(chars.length - 1))];
        }
        if (frameCount % 120 == 0 || frameCount % int(random(30, 50)) == 0) {
            rndChar2 = chars[int(random(chars.length - 1))];
        }
        if (frameCount % 2 == 0 || frameCount % int(random(3, 5)) == 0) {
            rndChar3 = chars[int(random(chars.length - 1))];
        }
        textFont(lfont);
        textSize(16);
        text(`
Minted tokens: ${1000 - tokenBalance} editions
Remaining tokens: ${tokenBalance} editions
Donated amount: ${donatedBalance} xtz
Click to update data
processing ..${rndChar1}${rndChar2}${rndChar1}${rndChar3}
`, 30, 60);


        image(logo, width - logo.width / 10, 0, logo.width / 10, logo.height / 10);
    }

    // display all token thumbs
    /*
    for (let i = 0; i < tokenList.length; i++) {
        let index = tokenList[i];
        if (thumbs[index] !== undefined) {
            let s = thumbs[index].width / divider;
            let pos = createVector(i * s + width/40, width/2.9 + s / 2);
            if(pos.x<width/3) {
                image(thumbs[index], pos.x, pos.y, s * 0.9, s * 0.9);
                fill(0);
                textSize(9);
                text(`owner: ${collectionData[index].owner.name}`, pos.x, pos.y + s * 1.05)
                text(`rule: ${collectionData[index].features[2].value}`, pos.x, pos.y + s * 1.1);
            }
        }
    }
    */

    // display one token thumb

    /*
    if(thumbs.length>1) {
        let img = thumbs[0];
        if (img !== undefined) {
            image(img,0,0,img.width/4,img.height/4);
        }
    }
    */

}

function mousePressed() {
    fetchToken();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function fetchToken() {
    // fetch generative token metadata
    fetch('https://api.fxhash.xyz/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `{ 
                generativeToken(id:24638) {
                    entireCollection { id, features, owner{ name }, thumbnailUri  }
                    balance
                    pricingFixed { price }
                }
            }`,
        })
    }).then(r => r.json()).then(data => initCollection(data));
}

function initCollection(data) {
    collectionData = data.data.generativeToken.entireCollection;
    thumbs = [];
    for (let i = 0; i < collectionData.length; i++) {
        let img = loadImage("https://ipfs.io/ipfs/" + collectionData[i].thumbnailUri.split("//")[1]);
        thumbs.push(img);
    }

    tokenBalance = data.data.generativeToken.balance;
    let totalAmount = 1000;
    let price = 8;
    let donationSplit = 0.5;
    let marketFee = 0.975;
    donatedBalance = (totalAmount - tokenBalance) * price * donationSplit * marketFee;

    updalpha = 255;
    /* 
        totalAmount = 1000
        price = 5
        donationSplit = 0.5
        marketFee = 0.975

        donated amount (xtz) = ( totalAmount - tokenBalance ) * price * donationSplit * marketFee 
    */
}

