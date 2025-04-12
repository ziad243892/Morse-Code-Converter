const morseCodeDictionary = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....",
    "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.",
    "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
    "Y": "-.--", "Z": "--..",
    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...",
    "8": "---..", "9": "----.", "0": "-----",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.", "(": "-.--.",
    ")": "-.--.-", "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-",
    "_": "..--.-", '"': ".-..-.", "$": "...-..-", "@": ".--.-."
};

function convertToMorse() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    let morseCode = '';

    for(let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        if(char === ' ') {
            morseCode += ' / ';
        } else {
            morseCode += morseCodeDictionary[char] ?  morseCodeDictionary[char] + ' ': '';
        }
    }
    document.getElementById('morseCodeOutput').value = morseCode.trim();
}

function playMorse() {

    const morseCode = document.getElementById('morseCodeOutput').value;
    const unit = 200;
    let context = new (window.AudioContext || window.webkitAudioContext)();

    let time = context.currentTime;

    for(let char of morseCode) {
        switch (char) {
        case '.': 
        playBeep(context, time, unit);
        time += unit / 1000 + 0.05;
        break;
        case '-':
            playBeep(context, time, unit);
            time += (unit * 4) / 1000 + 0.05;
            break;
            case ' ':
                time += (unit * 1.5) / 1000;
                break;

                case '/':
                    time +=( unit * 4) / 1000;
                    break;
    }
}

}

function playBeep(context, startTime, duration) {
    let oscillator = context.createOscillator();
    let gainNode = context.createGain();
    oscillator.frequency.value = 600;
    oscillator.type = "sine";
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
}