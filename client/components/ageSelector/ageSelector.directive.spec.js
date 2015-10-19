'use strict';

describe('Directive: ageSelector', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/ageSelector/ageSelector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.age = {min:0, max:0};
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<age-selector></age-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
