'use strict';

angular.module('abroadathletesApp').service('jobs', function (dataLoader) {

  this.jobsList = [];
  this.featuredJobsList = [];

  this.createJob = function(createdJob){
    return dataLoader.post('jobs', '', createdJob);
  };

  this.removeJob = function(job){
    return dataLoader.delete('jobs', job._id);
  };

  this.markJobAsFavourite = function(job, user){
    return dataLoader.post('jobs', 'markJobFavourite', {favouriteJob: job, user: user});
  };

  this.loadJobList = function() {
    return dataLoader.get('jobs').then(function(results) {
      this.jobsList = results.data;
      return this.jobsList;
    }.bind(this));
  };

  this.loadFeaturedJobs = function() {
    return dataLoader.get('featuredJobs').then(function(results) {
      this.featuredJobsList = results.data;
      return this.featuredJobsList;
    }.bind(this));
  }

});
