'use strict';

angular.module('abroadathletesApp')
    .controller('editPlayerModalController', function ($scope, player, update, $mdDialog, Auth, $filter, User, $window, Upload, GamePositions) {

        console.log(player);
        $scope.player = angular.copy(player);
        $scope.player.id_user.player.born = new Date($scope.player.id_user.player.born);
        $scope.cancel = $mdDialog.hide;

        $scope.logoProfile = null;
        $scope.croppedLogoProfile = null;
        $scope.positions =  GamePositions.getPositionsForSport('football');


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


                $scope.player.id_user.profilePhoto = data.photo;

            });


            var id  = $scope.player.id_user._id;
            delete $scope.player.id_user._id;
            delete $scope.player.id_user.numberPlayer;


            User.updateProfile({id: id,data: $scope.player.id_user}).$promise.then(function (response){
                $mdDialog.hide();
                update();
            });

        };


    });





