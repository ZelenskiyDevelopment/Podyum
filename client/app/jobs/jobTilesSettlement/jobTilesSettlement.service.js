'use strict';

angular.module('abroadathletesApp').service('jobTilesSettlement', function () {
  this.tilesSettlement = {
    filtering: {
      columns: 4,
      rows: 1
    },
    createJob: {
      columns: 2,
      rows: 1
    },
    jobList: {
      columns: 4,
      rows: 4
    },
    favourite: {
      columns: 2,
      rows: 1
    },
    alerted: {
      columns: 2,
      rows: 1
    },
    featured: {
      columns: 2,
      rows: 2
    }
  };

  this.openedPanels = {
    advancedFiltering: false,
    favouriteJobs: false,
    alertedJobs: false,
    featuredJobs: false
  };

  this.resetSettlement = function(){
    //XDDDDD
    this.openedPanels.advancedFiltering = false;
    this.openedPanels.favouriteJobs = false;
    this.openedPanels.alertedJobs = false;
    this.openedPanels.featuredJobs = false;

    this.tilesSettlement.filtering.columns = 4;
    this.tilesSettlement.filtering.rows = 1;
    this.tilesSettlement.createJob.columns = 2;
    this.tilesSettlement.createJob.rows = 1;
    this.tilesSettlement.jobList.columns = 4;
    this.tilesSettlement.jobList.rows = 4;
    this.tilesSettlement.favourite.columns = 2;
    this.tilesSettlement.favourite.rows = 1;
    this.tilesSettlement.alerted.columns = 2;
    this.tilesSettlement.alerted.rows = 1;
    this.tilesSettlement.featured.columns = 2;
    this.tilesSettlement.featured.rows = 2;
  };

  this.resetSettlement();

  this.advancedFilteringOnShow = function() {
    this.resetSettlement();
    this.openedPanels.advancedFiltering = true;
    this.tilesSettlement.filtering.columns = 6;
    this.tilesSettlement.filtering.rows = 2;
    this.tilesSettlement.featured.rows = 1;
  };

  this.advancedFilteringOnHide = function() {
    this.openedPanels.advancedFiltering = false;
    this.tilesSettlement.filtering.columns = 4;
    this.tilesSettlement.filtering.rows = 1;
    this.tilesSettlement.featured.rows = 2;
  };

  this.alertedJobsOnShow = function() {
    this.resetSettlement();
    this.openedPanels.alertedJobs = true;
    this.tilesSettlement.alerted.columns = 4;
    this.tilesSettlement.alerted.rows = 3;
    this.tilesSettlement.favourite.rows = 2;
    this.tilesSettlement.jobList.columns = 2;
    this.tilesSettlement.featured.columns = 6;
  };

  this.alertedJobsOnHide = function() {
    this.openedPanels.alertedJobs = false;
    this.tilesSettlement.alerted.columns = 2;
    this.tilesSettlement.alerted.rows = 1;
    this.tilesSettlement.jobList.columns = 4;
    this.tilesSettlement.favourite.rows = 1;
    this.tilesSettlement.featured.columns = 2;
  };

  this.featuredJobsOnShow = function() {
    this.resetSettlement();
    this.openedPanels.featuredJobs = true;
    this.tilesSettlement.featured.columns = 4;
    this.tilesSettlement.featured.rows = 3;
    this.tilesSettlement.jobList.columns = 2;
  };

  this.featuredJobsOnHide= function() {
    this.openedPanels.featuredJobs = false;
    this.tilesSettlement.featured.columns = 2;
    this.tilesSettlement.featured.rows = 2;
    this.tilesSettlement.jobList.columns = 4;
  };

  this.favouriteJobsOnShow = function(){
    this.resetSettlement();
    this.openedPanels.favouriteJobs = true;
    this.tilesSettlement.favourite.columns = 4;
    this.tilesSettlement.filtering.columns = 6;
    this.tilesSettlement.favourite.rows = 4;
    this.tilesSettlement.jobList.columns = 2;
    this.tilesSettlement.featured.rows = 1;
  };
  this.favouriteJobsOnHide = function(){
    this.openedPanels.favouriteJobs = false;
    this.tilesSettlement.favourite.columns = 2;
    this.tilesSettlement.favourite.rows = 1;
    this.tilesSettlement.filtering.columns = 4;
    this.tilesSettlement.jobList.columns = 4;
    this.tilesSettlement.featured.rows = 2;
  };

});
