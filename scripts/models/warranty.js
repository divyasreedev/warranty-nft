const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
    contractAddress: {
        type: String,
        required: true,        
    },
    tokenId: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: false,
        default: Date.now(),
    },
    expirationDate: {
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model('warrantySchema', warrantySchema);