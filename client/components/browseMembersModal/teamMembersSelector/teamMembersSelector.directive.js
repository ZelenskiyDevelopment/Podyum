'use strict';

angular.module('abroadathletesApp')
  .directive('teamMembersSelector', function (Auth, User) {
    return {
      templateUrl: 'components/browseMembersModal/teamMembersSelector/teamMembersSelector.html',
      restrict: 'E',
      scope: {
        contacts: '=selectedUsers',
        type:'=',
        user:'=',
        team:'='
      },
      link: function (scope, element, attrs) {
        if(scope.team) {
          loadContacts().then(function(data){scope.allContacts = data})
        }
        else {
          scope.allContacts = loadContacts();
        }
        scope.filterSelected = true;
        var data = mapData(scope.contacts || []);

        scope.contacts = _.map(data, function (item) {
          return _.find(scope.allContacts, function (contact) {
              return _.isEqual(contact, item)
            }) || item;
        });

        scope.querySearch = function (query) {
          var results = query ?
            scope.allContacts.filter(createFilterFor(query)) : [];
          return results;
        };

        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(contact) {
            return (contact._lowername.indexOf(lowercaseQuery) != -1);
          };
        }

        scope.addOnClick = function (index) {
          scope.contacts.push(scope.allContacts[index]);
        };

        function loadContacts() {
          var assigned = _.map(Auth.getCurrentUser().assigned, function (item) {
              return item.user
          });
          var contacts = _.flatten([Auth.getCurrentUser().followed, _.uniq(assigned)]);
          if(scope.type === 'rosterAdmin') {
            _.remove(contacts, function(contact) {
              return _.indexOf(scope.user.rosterAdmins, contact._id) !== -1;
            });
          }
          else if(scope.type === 'statsAdmin') {
            _.remove(contacts, function(contact) {
              return _.indexOf(scope.user.statsAdmins, contact._id) !== -1;
            });
          }
          else if(scope.type === 'recruitMember') {
            var currentAssigned = scope.user.assigned.filter(function (user) {
              return user.isPresent;
            });
            var currentAssignedId = _.map(currentAssigned, function (item) {
              return item.user._id;
            });
            _.remove(contacts, function(contact) {
              return _.indexOf(currentAssignedId, contact._id) !== -1;
            });
          }
          else if(scope.type === 'recruitMemberAsAdmin') {
            return User.getUsersAndFollowersByTeam({id: scope.team._id}).$promise.then(function (user) {
              var teamAssigned = _.map(user.assigned, function (item) {
                return item.user;
              });
              var teamContacts = _.flatten([user.followed, _.uniq(teamAssigned)]);
              var currentAssigned = user.assigned.filter(function (user) {
                return user.isPresent;
              });
              var currentAssignedId = _.map(currentAssigned, function (item) {
                return item.user._id;
              });
              _.remove(teamContacts, function(contact) {
                return _.indexOf(currentAssignedId, contact._id) !== -1;
              });
              return mapData(teamContacts);
            });
          }
          return mapData(contacts);
        }

        function mapData(collection) {
          return collection.map(function (item) {
            var contact = {
              name: item[item.kind].name || item[item.kind].firstName + ' ' + item[item.kind].lastName,
              image: 'photos/' + item.profilePhoto,
              _id: item._id
            };
            contact._lowername = contact.name.toLowerCase();
            return contact;
          });
        }
      }
    };
  });
