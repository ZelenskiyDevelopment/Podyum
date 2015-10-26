'use strict';

describe('Filter: capitalize', function () {

  // load the filter's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // initialize a new instance of the filter before each test
  var capitalize;
  beforeEach(inject(function ($filter) {
    capitalize = $filter('capitalize');
  }));

  it('should capitalize first letter', function () {
    var text = 'aaa';
    expect(capitalize(text)).toBe('Aaa');
  });

  it('should return the same text', function () {
    var text = 'AAA';
    expect(capitalize(text)).toBe('AAA');
  });

  it('should return the empty string', function () {
    var text = '';
    expect(capitalize(text)).toBe('');
  });
});
