'use strict';

describe('Controller: ProfileTeamStatsCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfileTeamStatsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    ProfileTeamStatsCtrl = $controller('ProfileTeamStatsCtrl', {
      $scope: scope,
      sharedScope: {
        games: {promise: $q.when([])},
        myPlayers: {promise: $q.when([])}
      }
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
