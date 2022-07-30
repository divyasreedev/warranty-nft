const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

router.post("/", function(req, res){
    const owner = req.body.owner;
    const url = "https://eth-goerli.alchemyapi.io/nft/v2/demo/getNFTs/?owner=" + owner;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const info = JSON.parse(data);
            const walletAddress = info.ownedNfts[0].contract.address;

            console.log(walletAddress);
            res.write("The wallet address is: " + walletAddress);
            res.send();
        });
    });
});
module.exports = router;





// const express = require('express');
// const router = express.Router();
// const warrantySchema = require('../models/warranty');

// router.get('/', async (req, res) =>  {
//     try {
//         //const dbResponse = await warrantySchema.find({});
//         //const dbResponse = await warrantySchema.find({expirationDate: {$gte: Date.now()}});
//         res.status(200).send({
//             "activeWarranties": dbResponse,
//         });
//     } catch(e) {
//         res.status(500).send({
//             "Error Caught": e,
//         })
//     }
// });

// module.exports = router;