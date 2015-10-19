'use strict';

describe('Controller: SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var SearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    SearchCtrl = $controller('SearchCtrl', {
      $scope: scope,
      $location:$location
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
