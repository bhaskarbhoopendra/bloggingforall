 let express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    flash         = require("connect-flash"),
    methodOverride= require("method-override"),
    User          = require("./models/user");

let commentRoutes     = require("./routes/comment"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

let app=express();
// SETTING UP THE APP

// seedDB();  SEED THE DATA BASE

mongoose.connect("mongodb://localhost/blogs", {useMongoClient:true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// PASSPORT CONFIGURATON
app.use(require("express-session")({
    secret:"Rusty is the cutest dog i know",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


// RUNNING UP THE SERVER
app.listen(process.env.PORT,process.env.ID,function(){
   console.log("final yelp camp has started"); 
});
