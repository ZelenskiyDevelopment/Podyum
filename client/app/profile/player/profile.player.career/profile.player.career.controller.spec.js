'use strict';

describe('Controller: ProfilePlayerCareerCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfilePlayerCareerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilePlayerCareerCtrl = $controller('ProfilePlayerCareerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
