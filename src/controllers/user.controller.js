const User = require("../models/user.model");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/",
  body("first_name").isLength({ min: 1 }).withMessage("First Name required"),
  body("last_name").isLength({ min: 1 }).withMessage("Last Name required"),
  body("email").isEmail().withMessage("Not a valid email"),
  body("pincode")
    .isNumeric()
    .withMessage('Numeric value expected')
    .custom((value) => {
      if (value < 100000 || value > 999999) {
        throw new Error("Pincode shoule be exactly 6 digits long");
      }
      return true;
    }),
  body("gender").custom((value) => {
    // console.log(value);
    if (value != "Male" && value != "Female" && value != "Others") {
      throw new Error("Invalid gender");
    }
    return true;
  }),
  body("age")
    .isNumeric()
    .withMessage("Age : Numeric value expected")
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("Age should be in between 1 & 100");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await User.create(req.body);

      res.status(201).send({ data: user });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
module.exports = router;
