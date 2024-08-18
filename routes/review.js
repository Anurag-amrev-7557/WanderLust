const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const listingController = require("../controllers/review.js")


const { isLoggedIn, isReviewOwner, validateListing, validateReview } = require("../middleware.js");


router.post("/", isLoggedIn, validateReview, wrapAsync(listingController.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewOwner, validateListing, wrapAsync(listingController.deleteReview));

module.exports = router;
