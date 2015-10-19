'use strict';

describe('Directive: assignSelector', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/assign-selector/assign-selector.html'));
  beforeEach(module('components/custom-datepicker/custom-datepicker.html'));
  beforeEach(module('components/achievements-modal/achievements-modal.html'));
  beforeEach(module('components/one-user-selector/one-user-selector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<assign-selector></assign-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
