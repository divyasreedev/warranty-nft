const mongoose = require("mongoose");

const warrantySchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: false
  },
  productId: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  warrantyDetails: {
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
  },
});

module.exports = mongoose.model("warrantySchema", warrantySchema);
