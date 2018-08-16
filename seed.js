var mongoose=require("mongoose");
var Campground =require("./models/campground");
var Comment = require("./models/comment");

var data=[
    {
        name:"The hidden leaf",
        image:"https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?h=350&auto=compress&cs=tinysrgb",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"The hidden mist",
        image:"https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"The lightining village",
        image:"https://images.pexels.com/photos/112378/pexels-photo-112378.jpeg?h=350&auto=compress&cs=tinysrgb",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]


function seedDB(){
    // REMOVING THE CAMPS
        Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
            console.log("We removed the campground frm the v3");
             // ADD A NEW CAMPGROUND
        data.forEach(function(seed){
           Campground.create(seed,function(err,campground){
             if(err){
                 console.log(err);
             } else{
                 console.log("A new campground is added");
                //  creating a comment
                Comment.create(
                    {
                        text:"This is an amzing place but wish there were internet",
                        author:"Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Added a new commnent");
                        }
                    });
             } 
           });
        });       
    });
       
}


module.exports = seedDB;


