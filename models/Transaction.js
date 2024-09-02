// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    panCard: { type: String, required: true },
    transactionType: { type: String, required: true },
    amount: { type: Number, required: true },
    /*////////////////////////////////////////////////accountNumber: { type: String },
    date: { type: Date, default: Date.now }*/
});

module.exports = mongoose.model('Transaction', transactionSchema);  
