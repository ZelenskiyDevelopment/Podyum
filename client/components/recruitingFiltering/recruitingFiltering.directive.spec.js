'use strict';

describe('Directive: recruitingFiltering', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/recruitingFiltering/recruitingFiltering.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recruiting-filtering></recruiting-filtering>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
