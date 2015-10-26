'use strict';

angular.module('abroadathletesApp')
  .factory('ModalEvent', function ($rootScope, $modal) {
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
        templateUrl: 'components/modalEvent/modalEvent.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              date = args.shift(),
              canEdit = args.shift(),
              cb = args.shift(),
              deleteModal;


            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Events at ' + (date.day<10?'0'+date.day:date.day) + '.' + (date.month+1<10?'0'+(date.month+1):(date.month+1)) + '.' + date.year,
                html: '',
                canEdit: canEdit,
                buttons: [{
                  classes: 'btn-success',
                  text: 'Save',
                  click: function(e,myEvents) {
                    cb();
                    //scope.myEvents = myEvents;
                    deleteModal.close(e);
                  }
                },{
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                },{
                  classes: 'btn-success',
                  text: '+',
                  click: function(e,myEvents) {
                    var newEvent = {};
                    newEvent.title = '';
                    newEvent.date = new Date(date.year,date.month,date.day);
                    date.events.push(newEvent);
                  }
                },{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e,index) {
                    date.events.splice(index, 1);
                  }
                }]
              },
              myEvents: date.events
            }, 'modal-success', "edit");

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
