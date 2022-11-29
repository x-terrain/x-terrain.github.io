// Audio Engine
window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let audioStarted = false;

let reverb = SimpleReverb(audioContext);
reverb.connect(audioContext.destination);
reverb.time = 2 //seconds
reverb.wet.value = 1
reverb.dry.value = 0.4
reverb.filterType = 'lowpass'
reverb.cutoff.value = 10000 //Hz

let notes = scales.javanese; // 0,1,3,5,7,9,10,12

let n_osc = audioContext.createOscillator();
n_osc.type = 'triangle';
let n_gain = audioContext.createGain();
n_gain.gain.value = 0;
n_osc.connect(n_gain);
n_gain.connect(reverb)

let b_osc = audioContext.createOscillator();
b_osc.type = 'triangle';
let b_gain = audioContext.createGain();
b_gain.gain.value = 0;
b_osc.connect(b_gain);
b_gain.connect(reverb)

function playNote(i) {
    n_osc.frequency.setValueAtTime(noteToFrequency(notes[(i+5)%notes.length]+48), 0);
    let attack = parseFloat(0.01);
    let decay = parseFloat(0.02);
    let sustain = parseFloat(0.03);
    let release = parseFloat(0.1);
    let ct = audioContext.currentTime;
    n_gain.gain.linearRampToValueAtTime(0, ct);
    n_gain.gain.linearRampToValueAtTime(0.6, ct + attack);
    n_gain.gain.linearRampToValueAtTime(0.5, ct + attack + decay);
    n_gain.gain.linearRampToValueAtTime(0.4, ct + attack + decay + sustain);
    n_gain.gain.linearRampToValueAtTime(0, ct + attack + decay + sustain + release);
}

function playBaseNote(i) {
    b_osc.frequency.setValueAtTime(noteToFrequency(notes[i]+48), 0);
    let attack = parseFloat(0.01);
    let decay = parseFloat(0.02);
    let sustain = parseFloat(0.03);
    let release = parseFloat(0.1);
    let ct = audioContext.currentTime;
    b_gain.gain.linearRampToValueAtTime(0, ct);
    b_gain.gain.linearRampToValueAtTime(0.6, ct + attack);
    b_gain.gain.linearRampToValueAtTime(0.5, ct + attack + decay);
    b_gain.gain.linearRampToValueAtTime(0.4, ct + attack + decay + sustain);
    b_gain.gain.linearRampToValueAtTime(0, ct + attack + decay + sustain + release);
}

function initAudio() {
    if (!audioStarted) {
        n_osc.start();
        b_osc.start();
        audioStarted = true;
    }
}

function noteToFrequency(note) {
    let a = 440; //frequency of A (common value is 440Hz)
    return (a / 32) * (2 ** ((note - 9) / 12));
}