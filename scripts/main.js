

function login() {
  console.log("Works here");
  const fs = require('browserify-fs');
  try {
    var data = fs.readFileSync('./accounts/adminLogins.txt', 'utf8');
    console.log(data);
  } catch (e) {
    console.log('Error:', e.stack);
  }
}