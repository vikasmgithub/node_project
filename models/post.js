const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  postid: {
    type: String
  },

  likes: {
    type: Array
  },

  user_id: {
    type: String
  },

  postContent: {
    type: String
  }
});

var Post = (module.exports = mongoose.model("Post", PostSchema));

module.exports.CreatePost = function(newPost, callback) {
  newPost.save(callback);
};

module.exports.getPosts = function(id, callback) {
  var query = { user_id: id };
  Post.find(query, callback);
};
