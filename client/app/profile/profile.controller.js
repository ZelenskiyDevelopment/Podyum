'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileCtrl', [
    '$scope',
    'User',
    '$stateParams',
    'Modal',
    'ModalEvent',
    '$location',
    'AssignModal',
    'Game',
    'Event',
    '$q',
    'sharedScope',
    function ($scope, User, $stateParams, Modal, ModalEvent, $location, AssignModal, Game, Event, $q, sharedScope) {
      sharedScope.games = $q.defer();
      sharedScope.myPlayers = $q.defer();
      sharedScope.myCoaches = $q.defer();
      sharedScope.myTeams = $q.defer();
      $scope.canEdit = false;
      var userPromise,
        ownerPromise = User.get().$promise;
      if ($stateParams.id) {
        userPromise = User.getUser({id: $stateParams.id}).$promise;
      } else {
        userPromise = ownerPromise;
      }

      $q.all([userPromise, ownerPromise]).then(function (result) {
        $scope.owner = _.last(result);
        $scope.user = _.first(result);
        $scope.canEdit = $scope.owner._id === $scope.user._id;
        if(!$scope.canEdit) {
          User.trackUser({
            trackedUser: $scope.owner,
            trackingUser: $scope.user
          });
        }
        var me = $scope.owner;
        if ($scope.user.kind === "player" || $scope.user.kind === "coach") {
          User.getUserByTeam({id: $scope.user._id}).$promise.then(function (user) {
            $scope.user.myTeams = user.assignedTo;
            $scope.myPresentTeams = [];
            $scope.myPastTeams = [];
            for (var i = 0; i < user.assignedTo.length; i++) {
              if(user.assignedTo[i].isPresent) {
                $scope.myPresentTeams.push(user.assignedTo[i]);
              }
              else {
                $scope.myPastTeams.push(user.assignedTo[i]);
              }
            }
          });
        }
        if (($scope.user.kind === "player" || $scope.user.kind === "coach") && $scope.user.assignTo) {
          User.get({id: $scope.user.assignTo}).$promise.then(function (myTeam) {
            $scope.user.myTeam = myTeam.team.name;
          });
        }



        if ($scope.user.kind === "player") {
      /*    Game.getGamesForTeams({id: $scope.user._id}).$promise.then(function (games) {
            _.remove(games, function(game) {
              return !game.data.isFinished || !game.userData;
            });
            $scope.games = games;
            sharedScope.games.resolve(games);

            $scope.myGameStats = new Array($scope.games.length);
            for (var i = 0; i < $scope.games.length; i++) {
              if ($scope.games[i].userData && $scope.games[i].userData[$scope.user._id]) {
                $scope.myGameStats[i] = $scope.games[i].userData[$scope.user._id];
              }
            }
            $scope.myStats = _.fill(Array(14), 0);

            for (var i = 0; i < $scope.myGameStats.length; i++) {
              for (var j = 0; j < 14; j++) {
                if($scope.myGameStats[i])
                  $scope.myStats[j] += $scope.myGameStats[i][j];
              }
            }
          }); */
        } else {
          Game.getGames({id: $scope.user._id}).$promise.then(function (games) {
            if($scope.user.kind === "team") {
              $scope.upcoming = [];
              $scope.previous = [];
              $scope.events = $scope.user.events;
              for(var i = 0; i < $scope.events.length; i++) {
                if(new Date($scope.events[i].event.date) > new Date()) {
                  $scope.upcoming.push($scope.events[i]);
                }
                else {
                  $scope.previous.push($scope.events[i]);
                }
              }
              for (var i = 0; i < games.length; i++) {
                if(games[i].data.isFinished) {
                  $scope.previous.push({event:{title:games[i].team1.team.name + " vs " + games[i].team2.team.name, date:games[i].date}});
                }
                else {
                  $scope.upcoming.push({event:{title:games[i].team1.team.name + " vs " + games[i].team2.team.name, date:games[i].date}});
                }
              }
            }
            _.remove(games, function(game) {
              return !game.data.isFinished;
            });
            $scope.games = games;
            sharedScope.games.resolve(games);
          });
        }
        if ($scope.user.kind === "team" || $scope.user.kind === "league") {
          User.getUserByTeam({id: $scope.user._id}).$promise.then(function (user) {
            $scope.myPlayers = user.assigned.filter(function (assignedUser) {
              return assignedUser.user.kind === 'player' && assignedUser.isPresent;
            });

            $scope.myCoaches = user.assigned.filter(function (assignedUser) {
              return assignedUser.user.kind === 'coach' && assignedUser.isPresent;
            });

            $scope.myTeams = user.assigned.filter(function (assignedUser) {
              return assignedUser.user.kind === 'team';
            });
            sharedScope.myPlayers.resolve($scope.myPlayers);
            sharedScope.myCoaches.resolve($scope.myCoaches);
            sharedScope.myTeams.resolve($scope.myTeams);
          });
        }
        var leaguePromises = [Game.getGames({id: $scope.user._id}).$promise,  User.getUserByTeam({id: $scope.user._id}).$promise];
        if($scope.user.kind === "league") {
          $q.all(leaguePromises).then(function(result) {
            $scope.myTeams = _.last(result).assigned;
            $scope.games = _.first(result);
            $scope.myStandings = [];
            $scope.upcoming = [];
            $scope.previous = [];
            for (var i = 0; i < $scope.myTeams.length; i++) {
              $scope.myStandings.push({
                id: $scope.myTeams[i].user._id,
                teamName: $scope.myTeams[i].user.team.name,
                wins: 0,
                loses: 0
              });
            }
            for (var i = 0; i < $scope.games.length; i++) {
              if($scope.games[i].data.isFinished) {
                $scope.previous.push($scope.games[i]);
              }
              else {
                $scope.upcoming.push($scope.games[i]);
              }
              if ($scope.games[i].data.winner) {
                if ($scope.games[i].data.winner == 1) {
                  $scope.addWin($scope.games[i].team1._id)
                  $scope.addLose($scope.games[i].team2._id)
                }
                else if ($scope.games[i].data.winner == 2) {
                  $scope.addWin($scope.games[i].team2._id)
                  $scope.addLose($scope.games[i].team1._id)
                }
              }
            }
          });
        }
        $scope.events = $scope.user.events;
      });




      $scope.addWin = function(id) {
        _.find($scope.myStandings, function(team) {
          if(team.id === id) {
            team.wins++;
          }
        })
      };
      $scope.addLose = function(id) {
        _.find($scope.myStandings, function(team) {
          if(team.id === id) {
            team.loses++;
          }
        })
      };
      $scope.deleteTrait = function (index, type) {
        if (type === "player") {
          $scope.user.player.traits.splice(index, 1);
        }
        if (type === "coach") {
          $scope.user.coach.traits.splice(index, 1);
        }
        User.putDataFromCreator($scope.user);
      };

      $scope.calendarOptions = {
        defaultDate: new Date(),
        minDate: new Date(2015, 1, 1),
        maxDate: new Date([2020, 12, 31]),
        dayNamesLength: 2, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
        eventClick: $scope.eventClick,
        dateClick: $scope.dateClick
      };


      $scope.calendarOptions.dateClick = function (dateClicked) {
        ModalEvent.confirm.delete()(dateClicked, $scope.canEdit, function () {
          var newEvents = [];
          _.each(dateClicked.events, function (event) {
            var newEv = {};
            newEv['event'] = {};
            newEv['event'].date = event.date;
            newEv['event'].title = event.title;
            newEv['day'] = dateClicked.day;
            newEv['month'] = dateClicked.month;
            newEv['year'] = dateClicked.year;
            newEvents.push(newEv);
          });
          _.remove($scope.user.events, function (event) {
            return event.day === dateClicked.day && event.month === dateClicked.month && event.year === dateClicked.year;
          });
          $scope.user.events.push.apply($scope.user.events, newEvents);
          User.putDataFromCreator($scope.user);
        });
      };

      $scope.follow = function () {
        var ID = $stateParams.id;
        User.followUser({id: ID}).$promise.then(function(result){
          $scope.owner.follows.push(ID);
          if(result.friends === 1) {
            var newFriend = {
              _id: ID,
              profilePhoto: $scope.user.profilePhoto,
              kind: $scope.user.kind
            };
            newFriend[$scope.user.kind] = $scope.user[$scope.user.kind];
            $scope.owner.friends.push(newFriend);
          }
        });

      };

      $scope.unfollow = function () {
        var ID = $stateParams.id;
        User.unFollowUser({id: ID});
        _.remove($scope.owner.follows, function (elem) {
          return elem === $scope.user._id;
        });
      };
      $scope.friend = function () {
        var ID = $stateParams.id;
        User.inviteToFriends({id: ID});
        $scope.owner.invited.push(ID);
      };

      $scope.assign = function () {
        AssignModal.assign.open()($scope.user.kind, function (data) {
          data.id = $stateParams.id;
          User.assignTo({data: data});
        });
      };

      $scope.recruit = function() {
        var data = {id: $stateParams.id, dtFrom: new Date()};
        User.addToTeam({data: data});
        console.log("recruit")
      };

      $scope.edit = function () {
        Modal.confirm.delete(function () {
          User.get().$promise.then(function (me) {
            $scope.user = me;
          });
        })('', $scope);
      };

      $scope.leave = function(index, ID, from, to, position, isPresent) {
        console.log(index);
        if ($scope.user.kind === "player" || $scope.user.kind === "coach")
          if(isPresent) {
            $scope.user.myTeams[index].dateTo = new Date();
            $scope.user.myTeams[index].isPresent = false;
          }
          else {
            $scope.user.myTeams.splice(index, 1);
          }
        User.leave({idChild: $scope.user._id, idParent: ID, dateFrom: from, dateTo: to, position: position, isPresent: isPresent});

      };

    }]);
