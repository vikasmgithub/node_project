const passport = require("passport");
var User = require("../models/user");
var Friend = require("../models/friends");
var Post = require("../models/post");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const mongoose = require("mongoose");

var j="vikas";
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

  //add friend
  app.post("/addfriend", function(req, res) {
    var send_id = req.body.send_id;
    var rec_id = req.body.rec_id;
    var status = req.body.status;

    var friend = new Friend({
      send_id: send_id,
      rec_id: rec_id,
      status: status
    });

    friend.save(function(err, friend) {
      if (err) throw err;

      res.send("success");
    });
  });

  //query on loged in user to check recived requests
  app.get("/friendrequests/:_id", function(req, res) {
    var id = req.params._id;
    Friend.getFriendRequests(id, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  //query on some user is that user is friend or not
  app.get("/friendrequest/:_id/:_id1", function(req, res) {
    var id = req.params._id;
    var id1 = req.params._id1;

    Friend.getFriendRequest(id, id1, function(err, result) {
      if (err) throw err;

      res.send(result);
    });
  });

  //for accepting friendrequest
  app.put("/acceptreq/:_id/:accept_id", function(req, res) {
    var id = req.params._id;
    var id1 = req.params.accept_id;
    console.log(id);

    Friend.getFriendRequest(id, id1, function(err, result) {
      if (err) throw err;
      var required_id = result[0]._id;
      var myquery = { _id: required_id };

      Friend.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("deleted");
      });
    });

    User.getUserById(id, function(err, user) {
      if (err) throw err;
      user.friends.push(id1);
      var query = { _id: id };
      var update = {
        friends: user.friends
      };
      User.findOneAndUpdate(query, update, function(err, user) {
        if (err) res.send("unsuccess");

        res.send("success");
      });
    });

    User.getUserById(id1, function(err, user) {
      if (err) throw err;
      user.friends.push(id);
      var query = { _id: id1 };
      var update = {
        friends: user.friends
      };
      User.findOneAndUpdate(query, update, function(err, user) {
        if (err) res.send("unsuccess");

        res.send("success");
      });
    });
  });

  app.get('/',function(req,res)
  {
    res.send("hlo");
  })

  //post creation
  app.post("/createpost/:_id", (req, res, next) => {
    var newPost = new Post({
      user_id: req.params._id,
      postContent: req.body.content
    });

    Post.CreatePost(newPost, (err, post) => {
      if (err) throw error;
    });
    return res.status(200).send();
  });

  app.get("/");

  app.get("/getpost/:_id", (req, res, next) => {
    var curr_id = req.params._id;
    Post.getPosts(curr_id, (err, post) => {
      if (err) throw err;
      if (post) {
        console.log(post);
      }
    });
    return res.status(200).send();
  });

  app.get("/user/feed/:_id", (req, res) => {
    var loged_id = req.params._id;
    User.getUserById(loged_id, (err, user) => {
      var total = [{}];
      if (err) throw err;

      var i = 0;
      user.friends.forEach(value => {
        Post.getPosts(value, (err, result) => {
          i = i + 1;
          if (err) throw err;
          if (result.length > 0) {
            console.log(result);
            if (total.length == 0) {
              total = result;
            } else {
              total = total.concat(result);
            }
          }
          if (i == user.friends.length) res.send(total);
        });
      });
    });
  });

  //profile
  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      res.json({
        user: {
          name: req.user.name,
          email: req.user.email,
          id:req.user._id
        }
      });
    }
  );
  //registering the user
  app.post("/register", function(req, res) {

    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    console.log(newUser);
    User.createUser(newUser, function(err, user) {
      if (err) throw err;

      j = user.id;
    });
    return res.status(200).send();
  });

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

          console.log("JWT"+token);
          res.json({
            success: true,
            token: "JWT " + token,
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
};

//    passport.authenticate("jwt", { session: false }),
