'use strict';

describe('Controller: ProfileTeamRosterCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfileTeamRosterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    ProfileTeamRosterCtrl = $controller('ProfileTeamRosterCtrl', {
      $scope: scope,
      sharedScope:{
        myPlayers : {promise: $q.when([])}
      }
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
