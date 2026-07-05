const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

const shortenerTools = require('./shortener');
const shorten = shortenerTools.shorten;
const resolve = shortenerTools.resolve;
const debugGetMaps = shortenerTools.debugGetMaps;


app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/hello', (req, res) => {
    res.json({ text: "Backend is running smoothly!" });
});

app.post('/shorten', (req, res) => {
    const { long_url } = req.body;

    if (!long_url) {
        return res.status(400).json({ error: "long_url is required" });
    }
    const shortenedUrl = shorten(long_url);

    // Returns the exact JSON schema your React app reads: data.short_url
    res.json({ short_url: shortenedUrl });
});

// This catches wildcards like http://localhost:8080/q8X2y
app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const originalUrl = resolve(shortCode);

    if (originalUrl) {
        return res.redirect(originalUrl);
    } else {
        return res.status(404).send('<h1>Shortened link not found or expired</h1>');
    }
});

app.get('/debug/storage', (req, res) => {
    const mapsSnapshot = debugGetMaps();
    // Returns the structured memory data cleanly to your browser screen
    res.json(mapsSnapshot);
});

app.listen(PORT, () => {
    console.log(`Server is live on http://127.0.0.1:${PORT}`);
});
