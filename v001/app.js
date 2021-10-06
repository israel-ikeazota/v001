var express        = require("express"), 
    app            = express(),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");
// seedDB(); //seed the database

//requiring routes
var indexRoutes      = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

//"this.connect", uses a database if it already exist or creates a new one (if it doesnt exist)
mongoose.connect("mongodb://localhost/yelp_camp_v9");
    
mongoose.connection
.once("open", () => console.log("Connected"))
.on("error", error => {
console.log("Your Error", error);
});

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "God is the greatest",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//use this to tell express to access the folder named "public", as all css and javascript files will be stored there
// app.use(express.static("public"));

//use this next line to get requests from the forms/body
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//middleware that was put in campground, this function automatically injects in all other necessary routes
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//to use the routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



 
app.listen(3000,
  console.log("The YelpCamp SERVER has started on port 3000"));