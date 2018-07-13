var key = "unique";
// var simpleCrypto = new SimpleCrypto(key);
var plain = "test";
console.log("Plain text: " + plain);
var encrypted = CryptoJS.AES.encrypt("Message", key);
console.log("Encrypted text: " + encrypted);
var decrypted = CryptoJS.AES.decrypt(encrypted, key);
console.log("Decrypted text: " + decrypted);
