const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { signout, signup, signin} = require("../controllers/auth");


router.post("/signup", [
    check("name").isLength({ min: 3 }).withMessage("name should be atleast of 3 characters"),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({ min: 5 }).withMessage("password should be atleast of 5 characters"),
], signup);

router.post("/signin",[
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min:5}).withMessage("password is mandatory"),
],signin);


router.get("/signout", signout);

module.exports = router;