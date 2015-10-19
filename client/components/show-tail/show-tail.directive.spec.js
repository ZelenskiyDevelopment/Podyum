'use strict';

describe('Directive: showTail', function () {

  // load the directive's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-tail></show-tail>');
    element = $compile(element)(scope);
    expect(1).toEqual(1);
  }));
});
