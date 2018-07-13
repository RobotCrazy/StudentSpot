import SimpleCrypto from "../node_modules/simple-crypto-js/src/SimpleCrypto.js";

var key = "unique"
var s = new SimpleCrypto(key);
var plain = "test";
console.log("Plain text: " + plain);
var encrypted = s.encrypt(plain);
console.log("Encrypted text: " + encrypted);
var decrypted = s.decrypt(encrypted);
console.log("Decrypted text: + " + decrypted);
