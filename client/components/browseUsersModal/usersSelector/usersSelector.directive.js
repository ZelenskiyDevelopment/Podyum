'use strict';

angular.module('abroadathletesApp')
  .directive('usersSelector', function (GamePositions) {
    return {
      templateUrl: 'components/browseUsersModal/usersSelector/usersSelector.html',
      restrict: 'E',
      scope: {
        contacts: '=selectedUsers',
        collection:'='
      },
      link: function (scope, element, attrs) {
        console.log(scope.collection)
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
          var contacts = [];
          contacts = scope.collection || [];
          return mapData(contacts );
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
