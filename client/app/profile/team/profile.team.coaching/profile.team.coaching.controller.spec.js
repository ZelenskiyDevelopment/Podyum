'use strict';

describe('Controller: ProfileTeamCoachingCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var ProfileTeamCoachingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,$q) {
    scope = $rootScope.$new();
    ProfileTeamCoachingCtrl = $controller('ProfileTeamCoachingCtrl', {
      $scope: scope,
      sharedScope:{
        myCoaches : {promise: $q.when([])}
      }
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
