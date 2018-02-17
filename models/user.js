const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

var User = module.exports = mongoose.model("User", userSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
  const query = {username:username}
  User.findOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback)
{
  bcrypt.compare(candidatePassword,hash,(err,isMatch) => {
    if(err) throw err;
    callback(null,isMatch);
  })
}
