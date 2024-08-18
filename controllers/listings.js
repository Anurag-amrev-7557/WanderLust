const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
    try {
        const allListings = await Listing.find();
        if (!allListings.length) {
            return next(new ExpressError(404, "No listings found"));
        }
        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        console.error('Error fetching listings:', err);
        next(err);
    }
};

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.show = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing doesn't exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new ExpressError(400, "No file uploaded");
        }
        let url = req.file.path; 
        let filename = req.file.filename;
        const newListing = new Listing(req.body);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
        await newListing.save();
        req.flash("success", "New Listing added successfully");
        res.redirect("/listings");
    } catch (err) {
        console.error('Error creating listing:', err);
        next(err);
    }
};

    

module.exports.editForm = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalUrl });
};

module.exports.updateForm = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if(typeof req.file !== "undefined") {
        let url = req.file.path; 
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};