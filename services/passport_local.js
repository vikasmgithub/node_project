const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = mongoose.model("User");

// module.exports = function(passport) {
//   passport.use(
//     new LocalStrategy(function(username, password, done) {
//       console.log(username)
//       User.findOne({ username: username }, function(err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, { message: "Incorrect username." });
//         }
//         bcrypt.compare(password, user.password, function(err, isMatch) {
//           if (err) throw err;
//           if (isMatch) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: "Wrong Password" });
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//       done(err, user);
//     });
//   });
// };









module.exports = function(passport){
  var opts={}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = keys.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
    console.log(jwt_payload);
    User.getUserById(jwt_payload._id,(err,user) => {
      if(err) {
        return done(err,false)
      }
      if(user){
        return done(null,user)
      }
      else{
        return done(null,false)
      }
    });
  }));
}
