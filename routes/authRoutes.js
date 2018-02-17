const passport = require("passport");
var User = require("../models/user");
var Post = require("../models/post")
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
const mongoose = require("mongoose");

module.exports = app => {
  app.get("/", function(req, res) {
    res.send(j);
  });

  app.get("/api/register", function(req, res) {
    res.send(j);
    console.log("register");
  });

  app.get("/api/login", function(req, res) {
    console.log("login");
  });

  // app.post("/login",
  //   passport.authenticate("local", {
  //     // successRedirect: "/",
  //     // failureRedirect: "/api/login",
  //     // failureFlash: true
  //   }), function(req, res) {
  //     var userdata = {
  //       name:req.user.name,
  //       email:req.user.email
  //     }
  //   console.log(userdata)
  //   res.send(userdata)
  // });

//post creation
app.post('/createpost',passport.authenticate('jwt',{session:false}),(req,res,next) => {
    var newPost = new Post ({
        user_id:req.user.id,
        postContent:req.body.content
    })

    Post.CreatePost(newPost,(err,post) =>{
      if(err) throw error
    })
    return res.status(200).send();
})

app.get('/getpost',passport.authenticate('jwt',{session:false}),(req,res,next) => {
  console.log(req.user._id)
  Post.getPosts(req.user._id, (err,post) =>{
        if(err) throw err;
        if(post)
        {
          console.log(post)
        }
  })
  return res.status(200).send();
})

//profile
  app.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next) =>{
    res.json({user:  {  "name":req.user.name,
                      "email":req.user.email}
                    })});

  //login the user
  app.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: "user not found" });
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), keys.secret, {
            expiresIn: 604800
          });
          res.json({
            success: true,
            token: "JWT" + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        } else {
          return res.json({ success: false, msg: "Wrong Password" });
        }
      });
    });
  });

  //registering the user
  app.post("/register", function(req, res) {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, function(err, user) {
      if (err) throw err;

      j = user.id;
    });
    return res.status(200).send();
  });
};
