function encrypt(text, key) {
  console.log("Text hex: " + toHex(text));
  console.log("Key hex: " + toHex(key));
  console.log("Text hex switchexed: " + switchex(toHex(text)));
  console.log("Key hex switchexed: " + switchex(toHex(key)));
  var combined = parseInt(switchex(toHex(text))) + parseInt(switchex(toHex(key)));
  return toHex(combined + "");
}

function decrypt(encrypted, key) {
  var unhexSubtract = fromHex(parseInt(encrypted) - parseInt(toHex(key)));
  var unswitch = switchex(unhexSubtract + "");
  return fromHex(unswitch);
}

function switchex(text) {
    var switched = "";
    var hex = "" + toHex(text);
    var firstHalf = hex.substring(0, hex.length/2);
    var secondHalf = hex.substring(hex.length/2);
    switched += secondHalf + firstHalf;
    return switched;
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

var plain = "test";
var key = "unique";
console.log("Plain text: " + plain);
var encrypted = encrypt(plain, key);
console.log("Encrypted text: " + encrypted);
var decrypted = decrypt(encrypted, key);
console.log("Decrypted text: " + decrypted);
