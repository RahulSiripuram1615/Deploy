
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Transaction = require('./models/Transaction');
const app = express();

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/transactionDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission (example of a POST request)
app.post('/submit', async (req, res) => {
    try {
        console.log('Form Data:', req.body); // Log the submitted form data
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(200).send('Transaction saved to MongoDB!');
    } catch (err) {
        console.error('Error saving transaction:', err); // Log any errors
        res.status(500).send('Error saving transaction data.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
