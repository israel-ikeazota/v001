var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
      name: "Cloud's Rest",
      image: "https://media.istockphoto.com/photos/young-woman-watches-sunrise-outside-camping-tent-picture-id1248575497?b=1&k=20&m=1248575497&s=170667a&w=0&h=kuufNTbZqQFgcU55RRYBHgSvJJJTfsYKbjq6doF0DVI=",
      description: "The kid cleared his throat. This was the moment. This is what he'd been building up to. He'd been dreaming of this for years, when he should have been lying on his bed thinking about racing cars or girls. I waited grimly for the pathetic request. What would it be? Levitating some object was a usual one, or moving it from one side of the room to the other. Perhaps he'd want me to conjure an illusion. That might be fun: there was bound to be a way of misinterpreting his request and upsetting him"
    },
    {
      name: "Green Land",
      image: "https://media.istockphoto.com/photos/equipment-and-accessories-for-mountain-hiking-in-the-wilderness-picture-id994672418?b=1&k=20&m=994672418&s=170667a&w=0&h=ZB45K6AlpZd89JA8rwg7cLf0c8pKLh7MsAmotQzk6K8=",
      description: "The kid cleared his throat. This was the moment. This is what he'd been building up to. He'd been dreaming of this for years, when he should have been lying on his bed thinking about racing cars or girls. I waited grimly for the pathetic request. What would it be? Levitating some object was a usual one, or moving it from one side of the room to the other. Perhaps he'd want me to conjure an illusion. That might be fun: there was bound to be a way of misinterpreting his request and upsetting him"
    },
    {
      name: "The Woods",
      image: "https://media.istockphoto.com/photos/man-relaxing-in-camping-hammock-picture-id1256664261?b=1&k=20&m=1256664261&s=170667a&w=0&h=NA_YgTEw-ESQpIM2opgNXY0lbmSDWRSPqPd1dfMQpXY=",
      description: "The kid cleared his throat. This was the moment. This is what he'd been building up to. He'd been dreaming of this for years, when he should have been lying on his bed thinking about racing cars or girls. I waited grimly for the pathetic request. What would it be? Levitating some object was a usual one, or moving it from one side of the room to the other. Perhaps he'd want me to conjure an illusion. That might be fun: there was bound to be a way of misinterpreting his request and upsetting him"
    }
]
function seedDB(){
  //Remove all campgrounds
  Campground.deleteMany({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!");
    //Remove all campgrounds
  Comment.deleteMany({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed comment!")})
    //add a few campgrounds
    data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
      if(err){
        console.log(err)
      } else {
        console.log("added a campground");
        //create a comment
        Comment.create(
          {
            text: "This place is great, but I there was internet",
            author: "Homer"
          }, function(err, comment){
              if(err){
                  console.log(err);
              } 
              //   else if (Array.isArray(campground.comment)){
              //   campground.comment.push(comment);
              // }

              // else if (!Array.isArray(campground.comment)){
              //   campground.comment = [];  
              //   } 
              //   campground.comment.push(comment);
              //   campground.save();
              //   console.log("Created a new comment");

                 else {
                  // campground.comment = [comment];
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Created a new comment");
              }
          });
      }
    });
  });
  });
  

  //add a few comments
}

module.exports = seedDB;