'use strict';

angular.module('abroadathletesApp')
    .factory('League',function($http){

        return {

            addLeague: function(data) {

                return $http.post('/api/league/addLeague',{
                    id_user: data.id_user,
                    leagueName: data.leagueName,
                    bio: data.bio,
                    founded: data.founded,
                    logoLeague: data.logoLeague,
                    address: data.address,
                    website: data.website,
                    country: data.country,
                    executive: data.executive

                }).then(function(result) {
                    return result;
                });
            },
            updateLeague: function(data) {

                return $http.post('/api/league/updateLeague',{
                    id_user: data.id_user,
                    leagueName: data.leagueName,
                    bio: data.bio,
                    founded: data.founded,
                    address: data.address,
                    website: data.website,
                    country: data.country,
                    _id: data._id
                }).then(function(result) {
                    return result;
                });
            },
            getLeague: function(id) {
                return $http.get('/api/league/'+id+'/getLeague').then(function(result) {
                    return result;
                });
            },
            getAll: function() {
                return $http.get('/api/league/getAll').then(function(result) {
                    return result;
                });
            }
        };
    });