const express = require('express');
const router = express.Router();
const warrantySchema = require('../models/warranty');


router.delete('/', async (req, res) =>  {
    try {
        console.log(req.body);
        // const dbResponse = await warranty.save();
        res.status(200).send({
            "Record Created": "hello",
        });
    } catch(e) {
        res.status(500).send({
            "Error Caught": e,
        })
    }
});

module.exports = router;