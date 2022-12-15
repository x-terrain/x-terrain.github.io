/*

L-Template: a framework to store artwork data components onchain by including them as features in the fx-hash smart contract.
The stored data are parameters of a Lindenmayer System, which is a formal grammar that was initially conceived of as a theory 
of plant growth. L-Systems can model complex forms of plants using relatively few simple rules. 

Custom rules are generated during the minting of each token, based on the transaction hash string. 

The idea is that each iteration of the artwork can be reproduced accurately using an L-System interpreter by accessing 
the tezos blockchain through the FxHash API (GraphQL) and interpreting token metadata.  

*/


let lSys;
let ruleSequence = ["+XX","-XX","+X-X","+X+X","-X-X"];
let w, h;

const fxRandArray = ( arr ) => {
  return arr[ Math.floor( fxrand() * arr.length ) ]
}

window.$fxhashFeatures = {
  "Angle": fxRandArray([60,90,120]),
  "Axiom": "X",
  "Rule": `F[${fxRandArray(ruleSequence)}]-[${fxRandArray(ruleSequence)}]`,
  "Iterations": fxRandArray([2,3,4,5])
}

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w,h);
  adjust(w,h);
}

function draw() {
  background(30);
  lSys.display(align(w,h).x,align(w,h).y);
  noLoop();
}

const align = (w,h) => {
    let screenPoints_x = [];
    let screenPoints_y = [];
  
    for(let i=0; i<lSys.screenPoints.length; i++) {
        screenPoints_x.push(lSys.screenPoints[i].x);
        screenPoints_y.push(lSys.screenPoints[i].y);
    }

    let xmin = min(screenPoints_x); 
    let xmax = max(screenPoints_x);
    let ymin = min(screenPoints_y);
    let ymax = max(screenPoints_y);
    let offset = createVector(w/2 - xmax/2, h/2 - ymax/2);
    return offset;
}

const adjust = (w,h) => {
  let options = {
        angle: $fxhashFeatures.Angle,
        axiom: $fxhashFeatures.Axiom,
        rules: {
            [$fxhashFeatures.Axiom]: $fxhashFeatures.Rule
        },
        iterations: $fxhashFeatures.Iterations,
        length: h / ($fxhashFeatures.Iterations * 3),
        lineWidth: h / 300
  }
  lSys = new LSystem( options );
  lSys.init(w,h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  adjust(w,h);
  loop();
}
