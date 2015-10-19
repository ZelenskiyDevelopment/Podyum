'use strict';

angular.module('abroadathletesApp')
  .directive('receiversSelector', function (Auth) {
    return {
      templateUrl: 'components/messages/new-conversation-modal/receivers-selector/receivers-selector.html',
      restrict: 'E',
      scope: {
        contacts: '=selectedUsers'
      },
      link: function (scope, element, attrs) {
        scope.allContacts = loadContacts();
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
          var contacts = _.flatten([Auth.getCurrentUser().friends, _.uniq(assigned)]);
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
