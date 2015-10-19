'use strict';

describe('Filter: getName', function () {

  // load the filter's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // initialize a new instance of the filter before each test
  var getName;
  var humanMock = {
      firstName: 'a',
      lastName: 'b'
    },
    noHumanMock = {
      name: 'c'
    };

  var userMock = {
    player: humanMock,
    coach: humanMock,
    fan: humanMock,
    team:noHumanMock,
    league:noHumanMock
  };
  beforeEach(inject(function ($filter) {
    getName = $filter('getName');
  }));

  it('should return player firstName and lastName', function () {
    userMock.kind = 'player';
    expect(getName(userMock)).toBe('a b');
  });

  it('should return coach firstName and lastName', function () {
    userMock.kind = 'coach';
    expect(getName(userMock)).toBe('a b');
  });

  it('should return fan firstName and lastName', function () {
    userMock.kind = 'fan';
    expect(getName(userMock)).toBe('a b');
  });

  it('should return team name', function () {
    userMock.kind = 'team';
    expect(getName(userMock)).toBe('c');
  });

  it('should return league name', function () {
    userMock.kind = 'league';
    expect(getName(userMock)).toBe('c');
  });

  it('should return empty string', function () {
    userMock.kind = '';
    expect(getName(userMock)).toBe('');
  });
});
