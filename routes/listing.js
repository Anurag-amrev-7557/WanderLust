const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });

router.route("/")
    .get((listingController.index))
    .post(
        isLoggedIn,
        upload.single("image"), 
        validateListing,
        wrapAsync(listingController.createListing)
    );

router.get("/new", isLoggedIn, listingController.new);

router.route("/:id")
    .get(
        validateListing, 
        wrapAsync(listingController.show)
    )
    .put(
        isLoggedIn,
        isOwner,
        upload.single("image"),
        validateListing,
        wrapAsync(listingController.updateForm)
    )
    .delete(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.deleteListing)
    );

router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    validateListing, 
    wrapAsync(listingController.editForm)
);

module.exports = router;
