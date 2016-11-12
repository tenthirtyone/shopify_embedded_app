(function () {
  'use strict';

  angular.module('App.home')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['AboutService'];

  function AboutController(AboutService) {
    var vm = this;
    vm.shopInfo = getShopInfo();

    init();

    function init() {

    }

    function getShopInfo() {
      AboutService.getShopInfo()
      .then(function (res) {
        console.log(res)
        vm.shopInfo = JSON.stringify(res, null, 2);
      });
    }

    return vm;
  }
}());
