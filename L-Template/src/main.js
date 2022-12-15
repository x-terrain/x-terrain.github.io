/*

L-Template: a framework to store artwork data components onchain by including them as features in the fx-hash smart contract.
The stored data are parameters of a Lindenmayer System, which is a formal grammar that was initially conceived of as a theory 
of plant growth. L-Systems can model complex forms of plants using relatively few simple rules. 

Custom rules are generated during the minting of each token, based on the transaction hash string. 

The idea is that each iteration of the artwork can be reproduced accurately using an L-System interpreter by accessing 
the tezos blockchain through the FxHash API (GraphQL) and interpreting token metadata.  

*/


let lSys;

let lOptions;
let lAngles;
let lRules;
let lIterations;
let lLen;
let w, h;

const fxRandArray = ( arr ) => {
  return arr[ Math.floor( fxrand() * arr.length ) ]
}

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w,h);
  
  generate(w,h);
}
function draw() {
  background(30);
  lSys.display(align().x,align().y+100);
  noLoop();
}

function generate(w,h) {
  lAngles = [60,90,120];
  let rSeq = ["+XX","-XX","+X-X","+X+X","-X-X"];
  lRules = [
    `F[${fxRandArray(rSeq)}]-[${fxRandArray(rSeq)}]`
  ];
  lIterations = fxRandArray([2,3,4,5]);

  if(lIterations==2) {
    lLen = height/6;
  } else if(lIterations==3) {
    lLen = height/12;
  } else if(lIterations==4) {
    lLen = height/20;
  } else {
    lLen = height/30;
  }

  lOptions = {
        angle: fxRandArray(lAngles),
        axiom: 'X',
        rules: {
            'X': fxRandArray(lRules)
        },
        iterations: lIterations,
        length: lLen,
        lineWidth: w/300
  }
  lSysRule = `rule: ${Object.keys(lOptions.rules)[0]} = ${Object.values(lOptions.rules)[0]}`;
  lSys = new LSystem(lOptions);
  lSys.init(w,h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  setup();
}
