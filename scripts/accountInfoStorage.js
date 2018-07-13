function encrypt(text, key) {
    var textHexSwitched = "";
    var firstHalf = text.substring(0, text.length/2 + 1);
    var secondHalf = text.substring(text.length/2 + 1);
    textHexSwitched += secondHalf + firstHalf;
    return textHexSwitched;
}

function toHex(s) {
    // utf8 to latin1
    var s = unescape(encodeURIComponent(s))
    var h = ''
    for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16)
    }
    return h
}

function fromHex(h) {
    var s = ''
    for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return decodeURIComponent(escape(s))
}

console.log("Normal Hex: " + toHex("test"));
console.log("Switched: " + encrypt("test", "unique"));
