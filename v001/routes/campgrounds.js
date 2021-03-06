const { Router } = require("express");
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
    
//INDEX - show all campgrounds
router.get("/", function(req,res){
  //console.log(req.user); ==> this returns the currently logged in username and _id, if no one is logged in then it returns "undefined"
  //Get all campgrounds from the Database
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
    res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
    }
  })
});

//CREATE - add new campground to Database
router.post("/", isLoggedIn, function(req,res){
  //get data from formand add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  // var description = req.body.description;
  var newCampground = {name: name, image: image, description: desc, author: author}
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else 
    console.log(newlyCreated)
    //redirect back to camgrounds
    res.redirect("/campgrounds"); 
  })
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req,res){
  res.render("campgrounds/new");
})

//SHOW -shows info about one campground
router.get("/:id", function(req,res){
  //find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else{
      //console.log(foundCampground);
      //render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  })
});

//EDIT CAMPGROUND ROUTE
  router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
      Campground.findById(req.params.id,function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
        });
      });

//UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, function(req, res){
//find and update the correct campground
Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
  if(err){
    res.redirect("/campgrounds");
  } else{
    //redirect somewhere(show page)
    res.redirect("/campgrounds/" + req.params.id);
  }
});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});


//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

function checkCampgroundOwnership(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err, foundCampground){
      if(err){
        res.redirect("back");
      } else{
          //does user own the campground
          if(foundCampground.author.id.equals(req.user._id)){
            next();
          } else {
            res.redirect("back");
          }
      }
    });
  } else {
    res.redirect("back");
  }
}


module.exports = router;