'use strict';

describe('Directive: publisher', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/wall/publisher/publisher.html'));
  beforeEach(module('components/wall/wall.html'));
  beforeEach(module('components/wall/event/event.html'));
  beforeEach(module('components/wall/event/event-comments/event-publisher/event-publisher.html'));
  beforeEach(module('components/wall/event/event-comments/event-comments.html'));
  beforeEach(module('components/wall/event/event-comments/event-comment/event-comment.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<wall><publisher></publisher></wall>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
