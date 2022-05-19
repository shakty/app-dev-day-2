// Example adapted from:
// https://www.syedhussim.com/node.js/generating-web-api-keys.html


// First, create the API key.
const SIZE = 40;
const crypto = require("crypto");
const rand = crypto.randomBytes(SIZE);
const unique_id = rand.toString("hex")
console.log(unique_id);

let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let key = "";

for (let i=0; i < rand.length; i++){
    let index = rand[i] % chars.length;
    key += chars[index];
}

// This is your API key.
console.log(key);

// Now, store it securely in hashed form with bcrypt.
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(key, saltRounds, function(err, hash) {
    // Store hash to file system (could also be a database).
    console.log(hash);
    let fileName = path.resolve(__dirname, '..', 'secret', 'key.js');
    fs.writeFileSync(fileName, `module.exports = "${hash}"`);
    console.log("Hash of API key created: " + "secret/key.js");
});
