/////////////
// App Dev //
/////////////

// Module: Web Server.
//////////////////////

// Here we learn how to secure our web server a bit more.

const { verify } = require('hcaptcha');
const HCAPTCHA_SECRET = require('./secret/hcaptcha.js');


// Add fs to read ssl cert and key from file system.
const fs = require('fs');
// Add https to explicitely run the HTTP server on TLS/SSL.
const https = require('https');

const express = require("express");
const app = express();
const PORT = 3000;

// Let's add a whitelist of addresses that can make requests.

// Old conf.
////////////

// File in directory /public/ will be cached and served.
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// POST (and PUT) requests require additional middleware to parse
// the HTTP requests' body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-party. Load the cookie-parsing middleware.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Redirect all http to https.
app.get('*', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);
})

// Intercepts all requests.
app.get("/", (req, res) => {
  res.send("Yay! The server is running!");
});


// Creating HTTPS server.
/////////////////////////


const httpsServer = https.createServer({
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.pem'),
}, app);

httpsServer.listen(3000, () => {
  console.log(`HTTPS Server listening on port: ${PORT}`)
});


// Add HCAPTCHA.
////////////////

app.post("/hcaptcha/", (req, res) => {

    let token = req.body.token;

    verify(HCAPTCHA_SECRET, token)
    .then((data) => {
        if (data.success === true) {
            console.log('success!', data);
            res.status(200).json({ 
              success: true,
              uri: 'forms_secure.html' 
            });
        }
        else {
            console.log('verification failed', data);
            res.status(500).json({ error: true });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: true });
    });
  }
);








