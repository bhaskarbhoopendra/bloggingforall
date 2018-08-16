const express = require("express");
const router  = express.Router({mergeParams:true});
let Campground = require("../models/campground");
let Comment = require("../models/comment");
// THis is the requiremtn of the middlware with index.js as the file name
const middleware = require("../middleware");


// COMMNENT ROUTES
router.get("/new",middleware.isLoggedIn,function(req,res){
    // find campground by id
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
       } else{
             res.render("comments/new", {campground,campground}); 
       }
    });
});

// CREATING COMMENT
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    // find the author name and then add it to the databse
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;
                    // console.log(req.user.username);
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

// EDIT ROUTE FOR THE COMMENT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    // WE HAVE THE CAMPGROUND ID IN THE req.params.id
    Comment.findById(req.params.comment_id,function(err, foundComments) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit" ,{campground_id:req.params.id,comments:foundComments});           
        }
    });
  
});

// UPDATE ROUTE FOR THE COMMENT
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
     if(err){
         res.redirect("back");
     }else{
         res.redirect("/campgrounds/" + req.params.id);
     }  
   });
});

// DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          res.redirect("back");
      } else{
          req.flash("success" , "Comment deleted");
       res.redirect("/campgrounds/"+ req.params.id);   
      }
   });
});
// MIDDLEWARE





module.exports= router;


