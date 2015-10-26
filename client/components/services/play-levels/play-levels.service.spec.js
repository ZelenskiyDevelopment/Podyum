'use strict';

describe('Service: playLevels', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var playLevels;
  beforeEach(inject(function (_PlayLevels_) {
    playLevels = _PlayLevels_;
  }));

  it('should return 9 items (undefined sport)', function () {
    expect(playLevels.getPlayLevels().length).toBe(9);
  });

  it('should return 9 items (common + basketball)', function () {
    expect(playLevels.getPlayLevels('basketball').length).toBe(9);
  });

  it('should return 17 items (common + football)', function () {
    expect(playLevels.getPlayLevels('football').length).toBe(17);
  });

  it('should return 9 items (random sport name)', function () {
    expect(playLevels.getPlayLevels('aaa').length).toBe(9);
  });
});
