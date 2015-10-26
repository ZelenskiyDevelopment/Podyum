'use strict';

angular.module('abroadathletesApp')
  .factory('AssignModal', function ($rootScope, $modal) {
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
        templateUrl: 'components/assignModal/assignModal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      assign: {

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
              param = args.shift(),
              cb = args.shift(),
              assignModal;


            assignModal = openModal({
              modal: {
                dismissable: true,
                title: 'Assign',
                buttons: [{
                  classes: 'btn-success',
                  text: 'Save',
                  click: function(e,data) {
                    if(((data.dtFrom && data.dtTo) || (data.dtFrom && data.isPresent)) ) {
                      cb(data);
                      assignModal.close(e);
                    } else{
                      //[TODO] notification: "from" and "to" cannot be empty.
                    }
                  }
                },{
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    assignModal.dismiss(e);
                  }
                }]
              },
              data:{kind: param}
            }, 'modal-success', "edit");

            assignModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
