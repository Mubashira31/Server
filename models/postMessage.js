const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title:String,
  message:String,
  creator:String,
  tags:[String],
  selectedFile:String,
  likeCount:{
    type:Number,
    default:0
  },
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const Post = mongoose.model('POST',postSchema)

module.exports = Post