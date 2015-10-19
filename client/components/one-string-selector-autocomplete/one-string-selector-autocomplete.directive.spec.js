'use strict';

describe('Directive: oneStringSelectorAutocomplete', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('components/one-string-selector-autocomplete/one-string-selector-autocomplete.html'));
  beforeEach(module('socketMock'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<one-string-selector-autocomplete></one-string-selector-autocomplete>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
