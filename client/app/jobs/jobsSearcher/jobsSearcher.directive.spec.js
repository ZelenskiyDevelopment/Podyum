'use strict';

describe('Directive: jobsSearcher', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
