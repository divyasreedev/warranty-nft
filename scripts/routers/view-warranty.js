const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  var data = [];
  try {
    const walletAddress = req.query.walletAddress;
    const url = `https://eth-goerli.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${walletAddress}&contractAddresses=${process.env.CONTRACT_ADDRESS}`;
    let response = await fetch(url);
    response = await response.json();
    response.ownedNfts.forEach(async (nft) => {
      let metadataUrl = nft.tokenUri.raw;
      console.log(metadataUrl);
      try {
        let metadataResponse = await fetch(`${metadataUrl}`);
        let metadata = await metadataResponse.json();
        if (metadata?.record != undefined) {
          let warrantyInfo = {
            productId: metadata.record.productId,
            warrantyDetails: metadata.record.warrantyDetails,
            issueDate: metadata.record.issueDate,
            expirationDate: metadata.record.expirationDate,
          };
          data.push(warrantyInfo);
          console.log(data);
        }
      } catch (e) {}
    });
  } catch (e) {
    res.status(500).send({
      status: "error",
      error: e,
    });
  }
});

module.exports = router;
