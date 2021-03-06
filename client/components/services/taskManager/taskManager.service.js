'use strict';

/**
 * @ngdoc service
 * @name abroadathletesApp.TaskManager
 * @description
 * # TaskManager
 * Service to talk with backend api.
 */
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
            /**
             * @ngdoc
             * @name abroadathletesApp.TaskManager#getAllEventsUser
             * @methodOf abroadathletesApp.TaskManager
             *
             * @description
             * Method to get data form the backend api
             * @example
             * TaskManager.getAllEventsUser(id);
             * @param {int} entity id
             * @returns {httpPromise} resolve with fetched data, or fails with error description.
             */
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
            },
            getAllTasksUser: function(id_user) {
                return $http.get('/api/taskmanager/'+id_user+'/getAllTasksUser').then(function(result) {
                    return result;
                })
            },
            getTaskById: function(id) {
                return $http.get('/api/taskmanager/'+id+'/getTaskById').then(function(result) {
                    return result;
                });
            },
            updateTask: function(dataTask) {
                if (angular.isObject(dataTask)) {
                    return $http.post('/api/taskmanager/updateTask',{
                        data:dataTask
                    }).then(function(result){
                        return result;
                    });
                }
            },
            addSubTask: function(subTask) {
                return $http.post('/api/taskmanager/addSubTask',{
                    data:subTask
                }).then(function(result){
                    return result;
                });
            },
            getSubTasks: function(id) {
                return $http.get('/api/taskmanager/'+id+'/getSubTasks').then(function(result) {
                   return result;
                });
            },
            deleteTask: function(id) {
                return $http.delete('/api/taskmanager/'+id+'/deleteTask').then(function(result) {
                    return result;
                })
            },
            getMyTask: function(id) {
                return $http.get('/api/taskmanager/'+id+'/getMyTask').then(function(result){
                    return result;
                })
            }
        };
    });
