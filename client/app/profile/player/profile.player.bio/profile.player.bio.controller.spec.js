'use strict';

describe('Controller: ProfileBioCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfilePlayerBioCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilePlayerBioCtrl = $controller('ProfilePlayerBioCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
