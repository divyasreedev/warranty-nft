const express = require('express');
const router = express.Router();
const warrantySchema = require('../models/warranty');

router.get('/', async (req, res) =>  {
    try {
        const dbResponse = await warrantySchema.find({});
        //const dbResponse = await warrantySchema.find({expirationDate: {$gte: Date.now()}});
        res.status(200).send({
            "activeWarranties": dbResponse,
        });
    } catch(e) {
        res.status(500).send({
            "Error Caught": e,
        })
    }
});

module.exports = router;