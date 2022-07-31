const express = require("express");
const router = express.Router();
const warrantySchema = require("../models/warranty");
const mintNFT = require('../services/mint-warranty-token');
const uploadMetadata = require('../services/upload-metadata');

router.post("/", async (req, res) => {
  try {
    const metadataId = await uploadMetadata({
      productId: req.body.productId,
      walletAddress: req.body.walletAddress,
      warrantyDetails: req.body.warrantyDetails,
      issueDate: req.body.issueDate,
      expirationDate: req.body.expirationDate,
      
    }); 
    const tokenId = await mintNFT(req.body.walletAddress, `https://api.jsonbin.io/v3/b/${metadataId}` );
    const warranty = new warrantySchema({
      tokenId: tokenId,
      productId: req.body.productId,
      walletAddress: req.body.walletAddress,
      warrantyDetails: req.body.warrantyDetails,
      issueDate: req.body.issueDate,
      expirationDate: req.body.expirationDate,
    });
    const dbResponse = await warranty.save();
    res.status(200).send({
      status: "success",
    });
  } catch (e) {
    res.status(500).send({
      status: "error",
      error: e,
    });
  }
});

module.exports = router;
