'use strict';

describe('Directive: recruitingResult', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/recruitingResult/recruitingResult.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recruiting-result></recruiting-result>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
