/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, orientDatabase) {

  // Insert routes below
  app.use('/api/milestones', require('./api/milestone'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/photos', require('./api/photo'));
  app.use('/api/jobs', require('./api/jobs'));
  app.use('/api/conversations', require('./api/conversation'));
  app.use('/api/rooms', require('./api/room'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/users', require('./api/user')(orientDatabase));
  app.use('/api/message', require('./api/gamemessage'));
  app.use('/api/subscription', require('./api/subscription'));
  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
