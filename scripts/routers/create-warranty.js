const express = require("express");
const router = express.Router();
const warrantySchema = require("../models/warranty");

router.post("/", async (req, res) => {
  try {
    const warranty = new warrantySchema({
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
