
function makeTypingEffect(element, text, callback, addDelay = 0) {
    const curText = getLastText(element).toString();
    const startFrom = matchingPartLength(curText, text);

    let delay = 50;
    let length = 1;

    element.lastText = text;
    for (let i = startFrom; i <= text.length || i <= curText.length; i++) {
        setTimeout(() => {
            partiallySetText(element, text, i);
        }, delay);
        delay += 100;
        length += 1;
    }

    if (callback !== null && callback !== undefined)
        setTimeout(callback, delay + addDelay);
}

function partiallySetText(element, newText, length) {
    const curText = decodeHtml(element.innerText.toString());
    let setText;

    if (curText.length >= length) {
        for (let i = newText.length; i < length; i++)
            newText += '\xa0';

        setText = newText.substring(0, length) + curText.substring(length);
    } else {
        setText = newText.substring(0, length); 
    }

    for (let i = 0; i < setText.length; i++) {
        if (setText.charAt(setText.length - 1 - i) != '\xa0') {
            setText = setText.slice(0, setText.length - i);
            break;
        }
    }

    let escapedText = '';
    for (let i = 0; i < setText.length - 1; i++)
        if (setText[i] == ' ' && setText[i + 1] == ' ') 
            escapedText += '\xa0';
        else
            escapedText += setText[i];
    
    escapedText += setText[setText.length - 1];

    element.innerHTML = encodeHtml(escapedText);
}

function getLastText(element) {
    if (element.lastText === undefined)
        return decodeHtml(element.innerText.toString());
    else 
        return element.lastText;
}

function matchingPartLength(string_a, string_b) {
    for (let i = 0; i < string_a.length && i < string_b.length; i++)
        if (string_a.charAt(i) != string_b.charAt(i))
            return i;
    
    return Math.min(string_a.length, string_b.length);
}

function encodeHtml(s) {
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const typingElement = document.getElementById('typing-text');

const phrases = [
    '<- yeah, this guy',
    '<- who is this?',
    '<- git enjoyer',
    '<- r_st developer',
    '<- creative programmer',
    '<- css stylist',
    '<- thats me!',
    '<- polygon bender',
    '<- safety is in my veins',
    '<- semicolon tamer',
    '<- 5d chess player',
    '<- rui kamishiro fan',
    '<- the codefather',
    '<- monday left him broken',

    '<- pixel whisperer',
    '<- opengl enthusiast',
    '<- polyglot programmer',
    '<- frontend aficionado',
    '<- desktop app magician',
    '<- cli tool connoisseur',

    ': i speak fluent binary',
    ': i put the fun in functions',
    ': tea ☕ > coffee',
    ': i debug in my sleep',
    ': i make pixels dance',
    ': calculators i build',
    ': may the source be with you',
    ': live, love, segfault',
    ': it\'s all simurgh plan',
    ': in r_st we trust',

    '...mutable reference occurs here...',
    'once upon a time in the land of performance...',
];

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function applyRandomPhrase(callback) {
    const phrase = phrases[randInt(phrases.length)];
    makeTypingEffect(typingElement, phrase, callback, 2000);
}

let callback;
callback = () => applyRandomPhrase(callback);

setTimeout(callback, 5000);