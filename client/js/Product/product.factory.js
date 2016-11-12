(function () {
  'use strict';

  angular.module('App.home')
  .factory('ProductService', ProductService);

  ProductService.$inject = ['$http', '$state'];

  function ProductService($http, $state) {

    return {
      getProducts: getProducts,
    };

    function getProducts() {
      return $http.get('/api/products', { params: { page: 1 } })
        .then(getProductsComplete)
        .catch(getProductsFailed);

      function getProductsComplete(response) {
        return response.data;
      }

      function getProductsFailed(error) {
        console.log('XHR Failed for getProducts.' + error.data);
      }
    }

  }

}());
