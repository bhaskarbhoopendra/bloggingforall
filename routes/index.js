var express = require("express");
var router  = express.Router({mergeParams:true});
var passport = require("passport");
var User = require("../models/user");

// ROUTE ROUTE
router.get("/",function(req,res){
   res.render("landing"); 
});



// ===================
// AUTH ROUTES
// ===================

// ROUTE FOR GETTING THE FORM
router.get("/register",function(req, res) {
   res.render("register"); 
});

// SIGN UP ROUTE
router.post("/register",function(req, res) {
    var newUser= new User({username:req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           req.flash("error" , err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success" , "Welcome to the Yelpcamp " + user.username);
          res.redirect("/campgrounds");
       });
   }) ;
});

// LOGIN ROUTES
router.get("/login",function(req, res) {
   res.render("login"); 
});

// LOGGING IN ROUTES WITH LOCALLY
router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req, res) {
  
});


// LOGOUT LOGIC
router.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","logged you out");
   res.redirect("/campgrounds");
});




module.exports = router;