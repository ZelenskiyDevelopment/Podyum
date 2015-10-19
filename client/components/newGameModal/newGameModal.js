'use strict';

angular.module('abroadathletesApp')
  .factory('NewGameModal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass, type) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);
      return $modal.open({
        templateUrl: 'components/newGameModal/newGameModal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      newGame: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        open: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              cb = args.shift(),
              newGameModal;


            newGameModal = openModal({
              modal: {
                dismissable: true,
                title: 'New Game',
                buttons: [{
                  classes: 'btn-success',
                  text: 'Save',
                  click: function(e,game) {
                    if(true) {
                      cb(game);
                      newGameModal.close(e);
                    } else{

                    }
                  }
                },{
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    newGameModal.dismiss(e);
                  }
                }]
              },
              game:{}
            }, 'modal-success', "edit");

            newGameModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
