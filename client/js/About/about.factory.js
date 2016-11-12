(function () {
  'use strict';

  angular.module('App.home')
  .factory('AboutService', AboutService);

  AboutService.$inject = ['$http', '$state', '$timeout'];

  function AboutService($http, $state, $timeout) {

    return {
      getShopInfo: getShopInfo,
    };

    function getShopInfo() {
      return $http.get('/api/shop/')
        .then(getShopEmailComplete)
        .catch(getShopEmailFailed);

      function getShopEmailComplete(response) {
        return response.data;
      }

      function getShopEmailFailed(error) {
        console.log('XHR Failed for getShopEmail.' + error.data);
      }
    }

  }

}());
