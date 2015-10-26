'use strict';

describe('Controller: ProfileLeagueContactCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfileLeagueContactCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileLeagueContactCtrl = $controller('ProfileLeagueContactCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
