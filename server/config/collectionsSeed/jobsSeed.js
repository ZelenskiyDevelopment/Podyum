var _ = require('lodash');
var User = require('../../api/user/user.model');
var Job = require('../../api/jobs/jobs.model');

module.exports = {
  refillCollection: function () {
    Job.find({}).remove(function () {
      Job.create({
        name: "Coach",
        description: "good coach coaching coach",
        taken: false,
        reward: 10000,
        date: '12/09/2015',
        featured: true,
        employer: null,
        employee: null,
        city: "Wroclaw",
        team: "WKS"
      }, {
        name: "Player",
        description: "good player playing well",
        taken: false,
        reward: 2000,
        date: '11/08/2015',
        featured: false,
        employer: null,
        employee: null,
        city: "Wroclaw",
        team: "Panthers"
      });
    });
  }
};
