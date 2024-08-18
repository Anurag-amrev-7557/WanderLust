const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, validateListing } = require("../middleware.js");
const listingController = require("../controllers/user.js");


router.route("/signup")
    .get(listingController.signupForm)
    .post(validateListing,  wrapAsync(listingController.newUser));

router.route("/login")
    .get(listingController.loginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), listingController.loginUser);

router.get("/logout", listingController.logoutUser);


module.exports = router;