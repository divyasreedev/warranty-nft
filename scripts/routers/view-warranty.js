const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  var data = [];
  var count = 0;
  try {
    const walletAddress = req.query.walletAddress;
    const url = `https://eth-goerli.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${walletAddress}&contractAddresses=${process.env.CONTRACT_ADDRESS}`;
    let response = await fetch(url);
    response = await response.json();
    if (response.ownedNfts.length === 0) {
      res.send([]);
    }
    response.ownedNfts.forEach(async (nft) => {
      let metadataUrl = nft.tokenUri.raw;
      try {
        let metadataResponse = await fetch(`${metadataUrl}`);
        count++;
        let metadata = await metadataResponse.json();
        if (metadata?.record != undefined) {
          let warrantyInfo = {
            productId: metadata.record.productId,
            warrantyDetails: metadata.record.warrantyDetails,
            issueDate: metadata.record.issueDate,
            expirationDate: metadata.record.expirationDate,
          };
          data.push(warrantyInfo);
          if (response.ownedNfts.length <= count) {
            res.status(200).send(data);
          }
          console.log("Count: " + count);
          console.log(data);
        }
      } catch (e) {
        count++;
        if (response.ownedNfts.length <= count) {
          res.status(200).send(data);
        }
      }
    });
  } catch (e) {
    res.status(500).send({
      status: "error",
      error: e,
    });
  }
});

module.exports = router;
