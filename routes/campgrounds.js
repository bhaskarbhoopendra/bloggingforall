var express = require("express");
var router  = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment   =require("../models/comment");
// THis is the requiremtn of the middlware with index.js as the file name
var middleware = require("../middleware");
// FINDING ALL THE CAMPGROUND

router.get("/",function(req,res){
    // console.log(req.user);
    Campground.find({},function(err,allCamp){
       if(err){
           console.log("oops error");
           console.log(err);
       }else{
           res.render("campgrounds/index",{campgrounds:allCamp,currentUser:req.user});  
       } 
    });
    //   res.render("campground",{campgrounds:campgrounds});
});

// CREATING A ROUTE

router.post("/",middleware.isLoggedIn,function(req,res){
  var name= req.body.name;
  var image= req.body.image;
  var price = req.body.price;
  var desc= req.body.description;
  var author={
      id:req.user._id,
      username:req.user.username
  }
  var newCampground= {name:name,price:price,image:image,description:desc,author:author}
//   crate a new campground and add it to the database
  Campground.create(newCampground,function(err,newlyCreated){
     if(err){
         console.log(err);
     } else{
         res.redirect("/campgrounds");
     }
  });
});

// CREATING A FORM ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/new"); 
});

// SHOWING THE CAMPGROUND ROUTES
router.get("/:id",function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err || !foundCampground){
          req.flash("error" , "Campground not found");
          res.redirect("back");
      } else{
            res.render("campgrounds/show" ,{campground:foundCampground});
      }
   });
});

// EDIT ROUTES
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
                if(err){
                    res.redirect("/campgrounds");
                } else{
                      res.render("campgrounds/edit" ,{campground:foundCampground});        
            }
     });
});

// UPDATE ROUTES
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
     if(err){
         console.log(err);
     } else{
       res.redirect("/campgrounds/"+ req.params.id);
     };
  });
});
// DESTROY ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
        res.redirect("/campgrounds"); 
      } else{
          res.redirect("/campgrounds");
      }
   }); 
});





module.exports= router;


