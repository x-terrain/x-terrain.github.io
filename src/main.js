let collectionData = [];
let thumbs = [];
let tokenList = [];

let tokenBalance;
let donatedBalance;
let totalAmount = 1000;
let price = 8;
let donationSplit = 0.5;
let marketFee = 0.975;

let updalpha = 255;

let bfont, lfont;
let logo;
let rndChar1 = "_";
let rndChar2 = "_";
let rndChar3 = "_";
let rndToken1 = 0;
let rndToken2 = 0;
let rndToken3 = 0;

const chars = `!@#$%^&*()_+{}:|?><';[].,/`

function preload() {
    bfont = loadFont("../assets/IBMPlexMono-BoldItalic.ttf");
    lfont = loadFont("../assets/IBMPlexMono-LightItalic.ttf");
    logo = loadImage("../assets/terrain-logo-blk-small.png");
}
function setup() {
    let canvasDiv = document.getElementById('myCanvas');
    let w = canvasDiv.offsetWidth;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        let sketchCanvas = createCanvas(w, w/2);
        sketchCanvas.parent("myCanvas");
    } else {
        let sketchCanvas = createCanvas(w, 500);
        sketchCanvas.parent("myCanvas");
    }

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
processing ..${rndChar1}${rndChar2}${rndChar1}${rndChar3}..${rndChar1}.${rndChar1}${rndChar3}${rndChar3}...${rndChar3}
Click here to update data
Minted tokens: ${totalAmount - tokenBalance} editions
Remaining tokens: ${tokenBalance} editions
Donated amount: ${donatedBalance} xtz
`, 30, 60);


        image(logo, width - logo.width / 10, 0, logo.width / 10, logo.height / 10);
    let topmar = 220;

stroke(0);
line(0,topmar-30,width,topmar - 30);
noStroke();

if(collectionData.length>0) {
        if(thumbs.length>1) {
            let img = thumbs[rndToken1];
            if (img !== undefined) {
                fill(255,200);
                rect(30-10,topmar-10,img.width/2+20,img.height/2+20);
                image(img,30,topmar,img.width/2,img.height/2);
            }
            // display one token thumb
            fill(0);
            text(`
Random artwork 
id: #${collectionData[rndToken1].id}
Collector/Donor: 
${collectionData[rndToken1].owner.name}
`, 30, topmar+img.height/2+20);
            
            let img2 = thumbs[rndToken2];
            if (img2 !== undefined) {
                fill(255,200);
                rect(width/3+30-10,topmar-10,img2.width/2+20,img2.height/2+20);
                image(img2,width/3+30,topmar,img2.width/2,img2.height/2);
            }
            // display one token thumb
            fill(0);
            text(`
Random artwork 
id: #${collectionData[rndToken2].id}
Collector/Donor: 
${collectionData[rndToken2].owner.name}
`, width/3+30, topmar+img.height/2+20);
            
            let img3 = thumbs[rndToken3];
            if (img3 !== undefined) {
                fill(255,200);
                rect(width-width/3+30-10,topmar-10,img3.width/2+20,img3.height/2+20);
                image(img3,width-width/3+30,topmar,img3.width/2,img3.height/2);
            }
            // display one token thumb
            fill(0);
            text(`
Random artwork 
id: #${collectionData[rndToken3].id}
Collector/Donor: 
${collectionData[rndToken3].owner.name}
`, width-width/3+30, topmar+img.height/2+20);
            }
    } else {
        fill(0);
        text(`Random artwork previews will appear here upon minting`, 30, topmar+50);
    }
    }
}

function mousePressed() {
    thumbs = [];
    updalpha = 255;
    fetchToken();
}

function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
}

function fetchToken() {
    // fetch generative token metadata
    fetch('https://api.fxhash.xyz/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // terrain: 24638
        // k3rnel: 19820
        // dotwork: 16060
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
    for (let i = 0; i < collectionData.length; i++) {
        let img = loadImage("https://ipfs.io/ipfs/" + collectionData[i].thumbnailUri.split("//")[1]);
        thumbs.push(img);
    }

    rndToken1 = floor(random(thumbs.length-1));
    rndToken2 = floor(random(thumbs.length-1));
    rndToken3 = floor(random(thumbs.length-1));

    tokenBalance = data.data.generativeToken.balance;
    donatedBalance = (totalAmount - tokenBalance) * price * donationSplit * marketFee;
    /* 
        totalAmount = 1000
        price = 5
        donationSplit = 0.5
        marketFee = 0.975

        donated amount (xtz) = ( totalAmount - tokenBalance ) * price * donationSplit * marketFee 
    */
}

