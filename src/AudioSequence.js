let pSec = 0;
let sequenceIndex = 0;
let sequenceIntervals = [250, 500, 1000, 2000];

function playSequence() {
    if(sequenceIndex >= segments.length) {
        for(let s of segments) {s[5] = 0; s[6] = 0;}
        sequenceIndex = 0;
    }
    segments[sequenceIndex][5] = 255;
    segments[sequenceIndex][6] = 255;
    // trigger audio here using angle between lines

    //console.log(int((segments[sequenceIndex][4])));
    playNote( int((segments[sequenceIndex][4])) );
    sequenceIndex++;;
    setTimeout(playSequence, random(sequenceIntervals));
}

function playBase() {
    playBaseNote( 0 );
    setTimeout(playBase, random(sequenceIntervals));
}

