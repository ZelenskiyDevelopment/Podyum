var _ = require('lodash');
var Milestone = require('../../api/milestone/milestone.model');

module.exports = {
  refillCollection : function(){
      Milestone.find({}).remove(function(){});
  }
};