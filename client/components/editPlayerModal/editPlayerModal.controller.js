'use strict';

angular.module('abroadathletesApp')
    .controller('editPlayerModalController', function ($scope, player, update, $mdDialog, Auth, $filter, User, $window, Upload) {

        console.log(player);
        $scope.player = angular.copy(player);
        $scope.player.player.born = new Date($scope.player.player.born);
        $scope.cancel = $mdDialog.hide;

        $scope.logoProfile = null;
        $scope.croppedLogoProfile = null;

        $scope.selectProfilePhoto = function() {
//            var file = evt.currentTarget.files[0];
//            var reader = new FileReader();
//            reader.onload = function (evt) {
//                $scope.$apply(function($scope){
//                    $scope.logoProfile = evt.target.result;
//                });
//            };
//            reader.readAsDataURL(file);
            alert('yes');
        };

        function base64ToBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        }

        $scope.update = function(){

            var profilePhoto = base64ToBlob($scope.croppedLogoProfile.replace('data:image/png;base64,',''), 'image/jpeg');


            Upload.upload({
                url: '/api/uploads/photos',
                file: profilePhoto
            }).progress(function (evt) {

            }).success(function (data, status, headers, config) {

                var id  = $scope.player._id;
                delete $scope.player._id;
                delete $scope.player.numberPlayer;

                $scope.player.profilePhoto = data.photo;
                User.updateProfile({id: id,data: $scope.player}).$promise.then(function (response){
                    $mdDialog.hide();
                    update();
                });
            });


        };


    });





