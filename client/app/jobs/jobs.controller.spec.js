'use strict';

describe('Controller: JobsCtrl', function () {

  // load the controller's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var JobsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    JobsCtrl = $controller('JobsCtrl', {
      $scope: scope,
      jobs:{
        loadJobList : function(){
          return $q.when([1,2]);
        }
      }
    });
    scope.$apply();
  }));

  it('should scope.jobs to be empty array [1,2]', function () {

    expect(scope.jobs).toEqual([1,2]);
  });
});
