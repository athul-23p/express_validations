const User = require('../models/user.model');
const express = require('express');

const router = express.Router();

router.post('/',async (req,res) => {
    try {
        let user = await User.create(req.body);

        res.status(201).send({data: user});

    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;