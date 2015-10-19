var _ = require('lodash');
var Photo = require('../../api/photo/photo.model');

module.exports = {
    refillCollection: function(){
        Photo.find({}).remove(function(){});
    }};