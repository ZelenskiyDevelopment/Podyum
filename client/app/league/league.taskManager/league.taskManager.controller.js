'use strict';

angular.module('abroadathletesApp')
    .controller('TaskManagerLeague', function ($scope, User, $compile,uiCalendarConfig,$uibModal,$rootScope,TaskManager, $timeout) {


        $scope.user = [];
        $scope.eventsUser = [];
        $scope.events = [];
        $scope.taskUser  = [];
        User.get().$promise.then(function (me) {
            $scope.user = me;
        });


        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();






        $timeout(function(){

            TaskManager.getAllEventsUser($scope.user._id).then(function(response){

                $scope.eventsUser = response.data;

            });

            TaskManager.getAllTasksUser($scope.user._id).then(function (tasks) {
                $scope.taskUser = tasks.data;

            });

        },2000);

        $timeout(function(){

            angular.forEach($scope.eventsUser, function(value, key){

                $scope.events.push({
                    id: value._id,
                    title: value.Title,
                    start: new Date(value.startDate),
                    end: new Date (value.endDate)
                });

            });

            angular.forEach($scope.taskUser, function(value, key){

                $scope.events.push({
                    id: value._id,
                    title:(value.isComplete) ? 'Task  - ' + value.name+' (Completed)' : 'Task  - ' + value.name +' (In progress) ' ,
                    start: new Date (value.dueDate),
                    end: new Date (value.dueDate),
                    backgroundColor: (value.isComplete) ? '#5cb85c' :'#f4b400',
                    borderColor:(value.isComplete) ? '#5cb85c' :'#f4b400'
                });

            });

        },3000);
        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'Poland' // an option!
        };
        /* event source that contains custom events on the scope */
//        $scope.events = [
//            {title: 'All Day Event',start: new Date(y, m, 1)},
//            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
//            {id: "dqee2314124dsaddfqw",title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
//            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
//            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
//            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
//        ];
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {

            TaskManager.getAllEventsUser($scope.user._id).then(function(response){

                $scope.eventsUser = response.data;

            });

            TaskManager.getAllTasksUser($scope.user._id).then(function (tasks) {
                $scope.taskUser = tasks.data;

            });

            angular.forEach($scope.eventsUser, function(value, key){
                $scope.events.push({
                    title: value.Title,
                    start: new Date(value.startDate),
                    end: new Date (value.endDate)
                });

            });

            angular.forEach($scope.taskUser, function(value, key){

                $scope.events.push({
                    id: value._id,
                    title:(value.isComplete) ? 'Task  - ' + value.name+' (Completed)' : 'Task  - ' + value.name +' (In progress) ' ,
                    start: new Date (value.dueDate),
                    end: new Date (value.dueDate),
                    backgroundColor: (value.isComplete) ? '#5cb85c' :'#f4b400',
                    borderColor:(value.isComplete) ? '#5cb85c' :'#f4b400'
                });

            });
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            console.log(date);
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };

        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
            console.log('changeView');
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }

            console.log('renderCalender');
        };
        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };

        $scope.dayClick = function(date) {
            console.log(date);
        }
        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                firstDay:1,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                dayClick: $scope.dayClick
            }
        };

        $scope.changeLang = function() {
            if($scope.changeTo === 'Hungarian'){
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo= 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'ModalAddEvent.html',
                controller: 'EventCtrl',
                size: size
            });
        };


        $scope.addTask = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'ModalAddTask.html',
                controller: 'TaskCtrl',
                size: size
            });
        };

        $rootScope.$on('EventAdd', function(event, args) {

            TaskManager.AddEvent($scope.user._id, args.title, args.start, args.end).then(function(response){

                if (response.data.status == 'error') {
                    $rootScope.alertMessageEvent = response.data.message;
                } else {
                    $scope.events.push({
                        title: args.title,
                        start: new Date(args.start),
                        end: new Date(args.end)
                    });

                    $rootScope.$emit('CloseModal', {close:true});
                }

            });
        });
});