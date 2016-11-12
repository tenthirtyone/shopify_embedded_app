(function () {
  'use strict';

  angular.module('App.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['HomeService', '$scope', 'routerHelper'];

  function HomeController(HomeService, $scope, routerHelper) {
    var vm = this;
    vm.email = '';
    vm.showEmailError = false;
    vm.updateShopEmail = updateShopEmail;
    vm.sendSalesReport = sendSalesReport;

    init();

    function init() {
      //getShopEmail();
    }

    function getShopEmail() {
      HomeService.getShopEmail()
      .then(function (res) {
        console.log(res);
        vm.email = res;
      });
    }

    function sendSalesReport() {
      HomeService.sendSalesReport()
      .then(function (res) {
        console.log(res);
      });
    }

    function updateShopEmail(email) {
      if (validateEmail(email)) {
        vm.showEmailError = false;
      } else {
        vm.showEmailError = true;
      }
    }

    function validateEmail(email) {
      var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
      return re.test(email);
    }

    return vm;
  }
}());
