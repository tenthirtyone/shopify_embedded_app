(function () {
  'use strict';
  angular.module('App.product')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'product',
        config: {
          url: '/product',
          templateUrl: 'views/product.template.html',
          controller: 'ProductController',
          controllerAs: 'product',
          navItem: {
            displayName: 'Product',
            sref: 'product',
          },
        },
      },
    ];
  }
}());
