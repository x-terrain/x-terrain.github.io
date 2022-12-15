let lSys;

let lSysRule;
let lOptions;
let lAngles;
let lRules;
let lIterations;
let lLen;

function setup() {
  let w = windowWidth;
  let h = windowHeight;
  createCanvas(w,h);
  
  lAngles = [60,90,120];
  let rSeq = ["+XX","-XX","+X-X","+X+X","-X-X"];
  lRules = [
    `F[${random(rSeq)}]-[${random(rSeq)}]`
  ];
  lIterations = random([2,3,4,5]);

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
        angle: random(lAngles),
        axiom: 'X',
        rules: {
            'X': random(lRules)
        },
        iterations: lIterations,
        length: lLen
  }
  lSysRule = `rule: ${Object.keys(lOptions.rules)[0]} = ${Object.values(lOptions.rules)[0]}`;
  lSys = new LSystem(lOptions);
  lSys.init(w,h);

  
}

function draw() {
  background(228,238,238);
  lSys.display(align().x,align().y);
}

function mousePressed() {
  initAudio();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
