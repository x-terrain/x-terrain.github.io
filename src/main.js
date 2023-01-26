fetch('https://api.fxhash.xyz/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: `{ 
      generativeToken(id:22568) {
        entireCollection { id, features, owner{ name }, thumbnailUri  }
        balance
        pricingFixed { price }
      }
    }`,
    })
}).then(r => r.json()).then(data => initCollection(data));

let collectionData = [];
let thumbs = [];
let font;
let tokenList = [];
let texts;
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
    
    /*
    blendMode(BLEND);
    image(bg, 0, 0, width, height);
    image(img,width/40,height/40,width/2.9,width/2.9);

    textFont(font);
    textSize(30);
    text("TERRAIN - internal microsite",width/20 + width/3,height/20);
    textSize(14);
    text(texts.intro + "\n\n" + "Details" + "\n\n" + texts.concept + "\n\n" + "The artworks will be available to mint from early Feb 2023. Below is a demo of fetching random iterations of generative token `22568` from fxhash", width/20 + width/3,height/10,width/2);
    textSize(14);

    //textSize(14);
    //text("Fetching random iterations of a test generative token from fx-hash:", width/20, height/5, width-width/20);
    
    if(width>height) {
    let divider = 1.5;
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
    }
    */
}

function initCollection(data) {
    collectionData = data.data.generativeToken.entireCollection;
    console.log(collectionData);
    for (let i = 0; i < collectionData.length; i++) {
        //let img = loadImage("https://ipfs.io/ipfs/" + collectionData[i].thumbnailUri.split("//")[1]);
        //thumbs.push(img);
    }
}

