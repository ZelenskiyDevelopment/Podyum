'use strict';

describe('Controller: BasketballCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var BasketballCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BasketballCtrl = $controller('BasketballCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
