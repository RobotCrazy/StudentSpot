import SimpleCrypto from "node_modules/simple-crypto-js";

var key = "unique";
var simpleCrypto = new SimpleCrypto(key);
var plain = "test";
console.log("Plain text: " + plain);
var encrypted = simpleCrypto.encrypt(plain);
console.log("Encrypted text: " + encrypted);
var decrypted = simpleCrypto.decrypt(encrypted);
