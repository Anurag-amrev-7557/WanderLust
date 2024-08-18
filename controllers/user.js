const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.newUser = async (req, res, next) => {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    await User.register(newUser, password);
    req.login(newUser, (err) => {
        if(err) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
    });
};

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You have logged out!");
        res.redirect("/listings");
    });
};