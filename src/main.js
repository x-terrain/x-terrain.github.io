let collectionData = [];
let tokens = [];

let tokenBalance;
let donatedBalance;
let totalAmount = 1000; // all editions of terrain
let firstprice = 8.0; // listed price over the first week
let firstmintedbatch = 26.0; // editions minted for 8 xtz
let secondprice = 4.0; // listed price after the first week
let donationSplit = 0.5;
let marketFee = 0.975;

let updalpha = 255;
let bfont, lfont;
let logo;

const chars = `!@#$%^&*()_+{}:|?><';[].,/`
let randseq;

function preload() {
    bfont = loadFont("../assets/IBMPlexMono-BoldItalic.ttf");
    lfont = loadFont("../assets/IBMPlexMono-LightItalic.ttf");
    logo = loadImage("../assets/terrain-logo-small.png");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    fetchToken();

    randseq = "processing";
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        let a = createA('https://www.fxhash.xyz/generative/24638', 'mint new edition on fx-hash');
        a.position(30, height/3);
        for(let i=0; i< 15; i++) randseq+="."; 
    } else {
        for(let i=0; i< 500; i++) randseq+=".";
    }
}

function draw() {
    clear();
    for(let i=0; i<randseq.length; i++) {
        if(i== int(random(randseq.length)) && i>10 && (frameCount%4 == 0 || frameCount%6 == 0)) {
            randseq = setCharAt(randseq,i,chars[ int( random( chars.length-1))] );
        }    
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        fill(255);
        textFont(bfont);
        text(`Terrain Dashboard - 
best viewed on a desktop`, 30, 30);
        textFont(lfont);
        textSize(16);
        text(`
Minted tokens: ${totalAmount - tokenBalance} editions
Remaining tokens: ${tokenBalance} editions
Donated amount: ${donatedBalance} xtz
${randseq}
`, 30, 60);
image(logo, 30, height/3+20, logo.width / 10, logo.height / 10);
} else {
        noStroke();
        textSize(20);

        stroke(255,100);
        line(0, height/4, width, height/4);
        noStroke();        
        fill(255);
        textFont(bfont);
        text(`Live token status:`, 30, 30);

        fill(0, 100, 90, updalpha);
        text("updating token data from fx-hash...", 30, 60);
        if (updalpha > 0) updalpha--;

        fill(255);
        textFont(lfont);
        textSize(16);
        text(`
Minted tokens: ${totalAmount - 900 - tokenBalance} editions
Remaining tokens: ${tokenBalance} editions
Donated amount: ${donatedBalance}+ xtz
${randseq}
Click to update data
`, 30, 60);


        image(logo, width - logo.width / 8, 20, logo.width / 10, logo.height / 10);
        let margin = height/2;

        stroke(255,100);
        line(0, margin, width, margin);
        
        for(let i=0;i<tokens.length; i++) {
            let s = width / 10;
            tokens[i].x = i * s + tokens[i].offset;
            tokens[i].y = margin + 20;
            tokens[i].w = s;
            tokens[i].h = s;
            tokens[i].showPreview();
            tokens[i].showData();
            tokens[i].showTree();
            if(tokens[i].x < 0 - s) {
                tokens[i].offset += tokens.length * s;
            }
            tokens[i].offset-=0.5;
        }
    if(mouseY>height-height/3) {
        fill(255);
        cursor(HAND);
    } else {
        cursor(ARROW);
        fill(0,200,200);
    }
    textFont(bfont);
    textSize(16);
    textAlign(CENTER);
    text("mint new edition on fx-hash", width/2,height-height/10);
    textAlign(LEFT);

    }
}

function mousePressed() {
    thumbs = [];
    updalpha = 255;
    if(mouseY<height-height/3) {
        fetchToken();
    } else {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        } else {
            window.open("https://www.fxhash.xyz/generative/24638");
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function fetchToken() {
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
    for (let i = 0; i < collectionData.length; i++) {
        let img = loadImage("https://ipfs.io/ipfs/" + collectionData[i].thumbnailUri.split("//")[1]);
        let id = collectionData[i].id;
        let owner = collectionData[i].owner.name;
        let angle = collectionData[i].features[0].value;
        let axiom = collectionData[i].features[1].value;
        let rule = collectionData[i].features[2].value;
        let iterations = collectionData[i].features[3].value;
        let t = new Token(id, owner, img, angle, axiom, rule, iterations);
        tokens.push(t);
    }

    
    //donatedBalance = nfs((totalAmount - tokenBalance) * firstprice * donationSplit * marketFee,[],2);
    
    // adjust donated balance calculating price changes over price tiers
    // 1st tier - 8 tzx, 26 editions
    // 2nd tier - 4 tzx, ... editions
    // console.log((totalAmount - tokenBalance - firstmintedbatch) * secondprice   + (firstmintedbatch * firstprice) * donationSplit * marketFee);
    // donatedBalance = nfs((totalAmount - tokenBalance - firstmintedbatch) * secondprice   + (firstmintedbatch * firstprice) * donationSplit * marketFee, [], 2);
    // after burn 900 editions (2023. 04. 05, as seen on fxhash 1st sales):

    tokenBalance = data.data.generativeToken.balance;
    donatedBalance = 288 * donationSplit * marketFee;
    console.log(tokenBalance);
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

class Token {
    constructor(id, owner, img, angle, axiom, rule, iterations){
        this.id = id;
        this.owner = owner;
        this.img = img;
        this.offset = 0;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.options = {
            angle: angle,
            axiom: axiom,
            rules: {
                "X": rule
            },
            iterations: iterations,
            length: 30 / iterations*1.5,
            lineWidth: 1
        }
        //console.log(this.options);
        this.lSys = new LSystem( this.options );
        this.lSys.init(width/10,width/10);
    }
    showPreview() {
        noFill();
        stroke(255,100);
        line(this.x,this.y-this.h*1.2,this.x+this.w,this.y-this.h*1.2+this.h);
        rect(this.x, this.y -this.h*1.2, this.w, this.h);
        if (this.img !== undefined) {
            image(this.img, this.x, this.y -this.h*1.2, this.w, this.h);
        }
    }
    showTree(x,y) {
        this.lSys.display(this.x,this.y);
        noFill();
        stroke(255,30);
        rect(this.x,this.y,this.w,this.h);
    }
    showData(x,y) {
        fill(255);
        textFont(lfont);
        textSize(width/130);
        text(`${this.options.rules.X}
#${this.id}
owned by: 
${this.owner}`,this.x, this.y + this.h * 1.2);
    }
}

