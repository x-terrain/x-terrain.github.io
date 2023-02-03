// L-Template tokenid: 22568



let collectionData = [];
let thumbs = [];
let tokenList = [];
let tokenBalance;
let font;
let logo;
let leafPos;
let leafSize;

function preload() {
    font = loadFont("../assets/IBMPlexMono-BoldItalic.ttf");
    logo = loadImage("../assets/terrain-logo-blk-small.png");
}
function setup() {
    let canvasDiv = document.getElementById('myCanvas');
    let w = canvasDiv.offsetWidth;
    let sketchCanvas = createCanvas(w,w);
    sketchCanvas.parent("myCanvas");
    leafPos = createVector(random(width/2-width/10,width/2+width/10),random(height/8,height/2));
    leafSize = random(w/10,w/4);

    fetch('https://api.fxhash.xyz/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: `{ 
      generativeToken(id:16060) {
        entireCollection { id, features, owner{ name }, thumbnailUri  }
        balance
        pricingFixed { price }
      }
    }`,
    })
}).then(r => r.json()).then(data => initCollection(data));
    
    /*
    for (let i = 0; i < 30; i++) tokenList.push(floor(random(100)));
    let a = createA('https://www.cryptoforcharity.io/cause-funds/environmental-conservation', 'Environmental Conservation Case Funds');
    a.position(width/20 + width/3, height-height/20);
    let b = createA('https://www.refractionfestival.com/editorial/meet-the-refraction-season-02-grant-recipients', 'Refraction DAO Creative Grants');
    b.position(width/20 + width/3, height-height/15);
    */
}

function draw() {
    clear();
    textSize(leafSize);
    text("🌱",leafPos.x,leafPos.y);
    imageMode(CENTER);
    let ratio = width/logo.width/4;
    image(logo,width/2,height/4,logo.width*ratio,logo.height*ratio);
    
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

function initCollection(data) {
    collectionData = data.data.generativeToken.entireCollection;
    for (let i = 0; i < collectionData.length; i++) {
        let img = loadImage("https://ipfs.io/ipfs/" + collectionData[i].thumbnailUri.split("//")[1]);
        thumbs.push(img);
    }

    tokenBalance = data.data.generativeToken.balance;
    
    /* 
        totalAmount = 1000
        price = 5
        donationSplit = 0.5
        marketFee = 0.975

        donated amount (xtz) = ( totalAmount - tokenBalance ) * price * donationSplit * marketFee 
    */  
}

