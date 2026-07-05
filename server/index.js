const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
    res.json({ text: "Backend is running smoothlyndv!" });
});


// Back to a standard listen block
app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});
