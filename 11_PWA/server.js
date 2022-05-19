// Server to serve the PWA

const express = require('express');
const app = express();
const PORT = 3000;

// Start the server on port 3000.
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

const APP = process.argv[2] || 'cheerapp';

app.use(express.static(APP));

// Intercepts all requests.
app.get('/', (req, res) => {
    res.send('Yay! The server is running!');
});

