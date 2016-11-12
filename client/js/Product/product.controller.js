(function () {
  'use strict';

  angular.module('App.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$http', 'ProductService'];

  function ProductController($http, ProductService) {
    var vm = this;
    vm.products = [];

    init();

    function init() {
      getProducts();
    }
    function getProducts() {
      ProductService.getProducts()
      .then(function (res) {
        console.log(res)
        vm.products = res;
      });
    }

    return vm;
  }
}());
