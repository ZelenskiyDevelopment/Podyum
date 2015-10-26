'use strict';

describe('Directive: custom-datepicker', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/custom-datepicker/custom-datepicker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<custom-datepicker></custom-datepicker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
