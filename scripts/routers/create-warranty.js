const express = require("express");
const router = express.Router();
const warrantySchema = require("../models/warranty");

router.post("/", async (req, res) => {
  try {
    const warranty = new warrantySchema({
      contractAddress: req.body.contractAddress,
      tokenId: req.body.tokenId,
      expirationDate: req.body.expirationDate,
    });
    const dbResponse = await warranty.save();
    res.status(200).send({
      "Record Created": dbResponse,
    });
  } catch (e) {
    res.status(500).send({
      "Error Caught": e,
    });
  }
});

module.exports = router;
