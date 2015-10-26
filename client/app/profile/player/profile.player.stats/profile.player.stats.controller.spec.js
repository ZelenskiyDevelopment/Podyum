'use strict';

describe('Controller: ProfilePlayerStatsCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfilePlayerStatsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilePlayerStatsCtrl = $controller('ProfilePlayerStatsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
