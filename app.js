const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User information (for demonstration purposes)
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// POST method for /bfhl
app.post('/bfhl', upload.single('file'), (req, res) => {
    const data = JSON.parse(req.body.data); // Parse the JSON string from the request body

    // Validate file
    let fileValid = false;
    let mimeType = '';
    let fileSizeKB = 0;

    if (req.file) {
        fileValid = true;
        mimeType = req.file.mimetype;
        fileSizeKB = req.file.size / 1024; // Convert bytes to KB
    }

    // Process input data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(char => char === char.toLowerCase()).sort().slice(-1);

    // Response object
    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet.length ? [highestLowercaseAlphabet[0]] : [],
        file_valid: fileValid,
        file_mime_type: mimeType,
        file_size_kb: Math.round(fileSizeKB)
    };

    res.json(response);
});

// GET method for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});