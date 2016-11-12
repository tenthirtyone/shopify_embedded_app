(function () {
  'use strict';

  angular.module('App.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['HomeService', '$scope', 'routerHelper'];

  function HomeController(HomeService, $scope, routerHelper) {
    var vm = this;

    init();

    function init() {

    }

    return vm;
  }
}());
