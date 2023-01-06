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
let bg;
let tokenList = [];

function preload() {
    font = loadFont("../assets/IBMPlexMono-BoldItalic.ttf");
    bg = loadImage("../assets/bg.png");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 30; i++) tokenList.push(floor(random(100)));
}

function draw() {
    //blendMode(BLEND);
    image(bg, 0, 0, width, height);
    textFont(font);
    textSize(14);
    fill(0);
    text("rewilding nature through generative art", 50, 50);
    fill(0);
    text("fetching generative token 22568 from fx-hash...", 50, 80);
    //blendMode(SCREEN);

    let divider = 1.5;
    for (let i = 0; i < tokenList.length; i++) {
        let index = tokenList[i];
        if (thumbs[index] !== undefined) {
            let s = thumbs[index].width / divider;
            let pos = createVector(i * s, height / 2 - s / 2);
            image(thumbs[index], pos.x, pos.y, s * 0.9, s * 0.9);
            fill(0);
            textSize(9);
            text(`owner: ${collectionData[index].owner.name}`, pos.x, pos.y + s * 1.05)
            text(`rule: ${collectionData[index].features[2].value}`, pos.x, pos.y + s * 1.1);
        }
    }
}

function initCollection(data) {
    collectionData = data.data.generativeToken.entireCollection;
    for (let i = 0; i < collectionData.length; i++) {
        let img = loadImage("https://ipfs.io/ipfs/" + collectionData[i].thumbnailUri.split("//")[1]);
        thumbs.push(img);
    }
}

