angular.module('abroadathletesApp').factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            OAuth.initialize('tduidpr8l0dzDEL9PN4Kye4RJJU', {cache:true});
            authorizationResult = OAuth.create('twitter');
            console.log(authorizationResult);
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        geUser: function() {
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/account/verify_credentials.json').done(function(data) {
                deferred.resolve(data)
            });
            return deferred.promise;
        },
        getLatestTweets: function () {
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) {
                deferred.resolve(data)
            });
            return deferred.promise;
        }
    }
    
});