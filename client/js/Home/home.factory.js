(function () {
  'use strict';

  angular.module('App.home')
  .factory('HomeService', HomeService);

  HomeService.$inject = ['$http', '$state', '$timeout'];

  function HomeService($http, $state, $timeout) {
    var APIURL = '/api/shop/';

    return {
      getShopEmail: getShopEmail,
      sendSalesReport: sendSalesReport,
    };

    function getShopEmail(query) {
      return $http.get(APIURL + 'email', { params: query })
        .then(getShopEmailComplete)
        .catch(getShopEmailFailed);

      function getShopEmailComplete(response) {
        return response.data;
      }

      function getShopEmailFailed(error) {
        console.log('XHR Failed for getShopEmail.' + error.data);
      }
    }

    function sendSalesReport(query) {
      return $http.get(APIURL + 'salesreport')
        .then(sendSalesReportComplete)
        .catch(sendSalesReportFailed);

      function sendSalesReportComplete(response) {
        return response.data;
      }

      function sendSalesReportFailed(error) {
        console.log('XHR Failed for sendSalesReport.' + error.data);
      }
    }
  }

}());
