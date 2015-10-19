var _ = require('lodash');
var Comment = require('../../api/comment/comment.model');

module.exports = {
  refillCollection: function(){
      Comment.find({}).remove(function(){});
      Comment.create({author: "5604602aaa4543822b3ec5e7", content: "testComment"});
  }};