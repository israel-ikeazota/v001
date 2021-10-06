var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    Comment    = require("../models/comment");
    // User = require("../models/user");
//Comments New
router.get("/new", isLoggedIn, function(req, res){
  //Find Campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }
    else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//Comments Create
router.post("/", function(req, res){
  //look up campgrounds using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      //create new comment
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        }
        else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // console.log("New coment's username will be: " + req.user.username);
          //save comment
          comment.save();
          //connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // console.log(comment);
          //redirect to campground show page
          res.redirect('/campgrounds/' + campground._id);
        }
      });      
    }
  });
});

//COMMENT EDIT
router.get("/:comment_id/edit", function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id}, {comment: foundComment});
    }
  });
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};


module.exports = router;