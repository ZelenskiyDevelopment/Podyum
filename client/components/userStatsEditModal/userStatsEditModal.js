'use strict';

angular.module('abroadathletesApp')
  .factory('UserStatsEditModal', function ($rootScope, $modal) {
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
        templateUrl: 'components/userStatsEditModal/userStatsEditModal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      userStatsEdit: {

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
              data = args.shift(),
              cb = args.shift(),
              statsEditModal;


            statsEditModal = openModal({
              modal: {
                dismissable: true,
                title: 'Stats edit specific for user',
                buttons: [{
                  classes: 'btn-success',
                  text: 'Save',
                  click: function(e,statsData) {
                    if(true) {
                      cb(statsData);
                      statsEditModal.close(e);
                    } else{
                      //[TODO] notification: "from" and "to" cannot be empty.
                    }
                  }
                },{
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    statsEditModal.dismiss(e);
                  }
                }]
              },
              data:data,
              statsData: {}
            }, 'modal-success', "edit");

            statsEditModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
