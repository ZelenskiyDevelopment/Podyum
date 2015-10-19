'use strict';

describe('Directive: jobsFiltering', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('app/jobs/jobsFiltering/jobsFiltering.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
