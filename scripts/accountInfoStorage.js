function encrypt(text, key) {
  var combined = switchex(toHex(text)) + switchex(toHex(key));
  return toHex(combined + "");
}

function decrypt(encrypted, key) {
  var unhex = fromHex(encrypted);
  var subtractKeyHex = unhex.substring(0, unhex.length - switchex(toHex(key)).length);
  var unhexedKeyHex = fromHex(subtractKeyHex);
  var firstHalf_keyHex = unhexedKeyHex.substring(0, unhexedKeyHex.length/2);
  var secondHalf_keyHex = unhexedKeyHex.substring(unhexedKeyHex.length/2);
  var unswitchexedKeyHex = secondHalf_keyHex + firstHalf_keyHex;
  return fromHex(unswitchexedKeyHex);
}

function switchex(text) {
    var switched = "";
    var firstHalf = text.substring(0, text.length/2);
    var secondHalf = text.substring(text.length/2);
    switched += secondHalf + firstHalf;
    return toHex(switched);
}

function fromHex(hex) {
    var hex = hex.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

var plain = "password";
var key = "uniqueKey";
console.log("Plain text: " + plain);
var encrypted = encrypt(plain, key);
console.log("Encrypted text: " + encrypted);
var decrypted = decrypt(encrypted, key);
console.log("Decrypted text: " + decrypted);
