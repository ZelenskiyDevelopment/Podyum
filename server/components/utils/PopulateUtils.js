var _ = require('lodash');
module.exports = {
  userPopulateOptionsArray: function (path) {
    var getOptions = function(path){
      return {
        path: path,
        model: 'User',
        select: 'kind player team league fan coach profilePhoto _id'
      };
    };

    if(_.isArray(path)){
      return _.map(path, function(item){
        return getOptions(item);
      });
    } else {
      return [getOptions(path)];
    }
  },
  userPopulateOptions: function (path) {
    return {
      path: path,
      select: 'kind email player team league fan coach profilePhoto _id'
    };
  }
};
