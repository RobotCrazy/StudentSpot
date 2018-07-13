import sha256 from './node_modules/crypto-js/sha256';
import hmacSHA512 from './node_modules/crypto-js/hmac-sha512';
import Base64 from './node_modules/crypto-js/enc-base64';

// const message, nonce, path, privateKey; // ...
// const hashDigest = sha256(nonce + message);
// const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");

var plain = "test";
var key = "unique";
var encrypted = CryptoJS.AES.encrypt(plain, key);
var decrypted = CryptoJS.AES.decrypt(encrypted, key);

console.log("Plain text: " + plain);
console.log("Encrypted: " + encrypted);
console.log("Decrypted: " + decrypted);
