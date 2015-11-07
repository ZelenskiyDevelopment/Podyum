'use strict';

angular.module('abroadathletesApp')
    .factory('TaskManager', function ($http) {
        return {
            AddEvent: function(id_user,title, start, end) {
                var event = {
                    Title: title,
                    startDate: start,
                    endDate: end
                };
                return $http.post('/api/taskmanager/addNewEvent', {
                    id_user: id_user,
                    event:event
                }).then(function(result) {
                    return result;
                });
            },
            getAllEventsUser: function(id_user) {
                return $http.get('/api/taskmanager/'+id_user+'/getAllEventsUser').then(function(result) {
                    return result;
                });
            },

            AddTask: function(id, task) {
                return $http.post('/api/taskmanager/AddNewTask', {
                    id_user: id,
                    taskFor: task.taskFor,
                    name: task.name,
                    description: task.description,
                    dueDate: task.dueDate,
                    shareWith: task.shareWith
                }).then(function(result) {
                    return result;
                })
            }
        };
    });
