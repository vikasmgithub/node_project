const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema({

    send_id:{
      type:String
    },

    rec_id:{
      type:String
    },

    status:{
      type:String
    }
})

var Friend = module.exports = mongoose.model('Friend',FriendSchema)

module.exports.getFriendRequest = function(id,id1,callback){
    const query = {send_id:id,rec_id:id1}
    Friend.find(query,callback)
}

module.exports.getFriendRequests = function(id,callback){
  const query = {rec_id:id}
  Friend.find(query,callback)
}
