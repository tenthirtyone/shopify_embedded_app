(function() {
  'use strict';

  angular.module('App', [
    'App.directives',
    'App.home',
    'App.product',
    'App.about',
    'ngStorage',
    'ui.router'
  ]);

}());

(function () {
'use strict';

angular.module('App.about', []);

}());

(function () {
'use strict';

angular.module('App.home', []);

}());

(function () {
'use strict';

angular.module('App.product', []);

}());

(function () {
'use strict';

angular.module('App.directives', []);

}());

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

(function () {
  'use strict';
  angular.module('App.about')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'about',
        config: {
          url: '/about',
          templateUrl: 'views/about.template.html',
          controller: 'AboutController',
          controllerAs: 'about',
          navItem: {
            displayName: 'About',
            sref: 'about',
          },
        },
      },
    ];
  }
}());

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

(function () {
  'use strict';

  angular.module('App.home')
  .factory('HomeService', HomeService);

  HomeService.$inject = ['$http', '$state', '$timeout'];

  function HomeService($http, $state, $timeout) {

    return {

    };

  }

}());

(function () {
  'use strict';
  angular.module('App.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'views/home.template.html',
          controller: 'HomeController',
          controllerAs: 'app',
          navItem: {
            displayName: 'Home',
            sref: 'home',
          },
        },
      },
    ];
  }
}());

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

(function () {
  'use strict';

  // Response Headers
  angular.module('App')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
  },
]);

}());

(function () {
  // Modified version of John Papa's Router Helper
  // https://github.com/johnpapa/angular-styleguide

  angular
    .module('App')
    .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

    this.$get = RouterHelper;

    $locationProvider.html5Mode(false);

    RouterHelper.$inject = ['$state'];

    function RouterHelper($state) {
      var service = {
        configureStates: configureStates,
        getStates: getStates,
      };

      return service;

      function configureStates(states, otherwisePath) {
        states.forEach(function (state) {
          $stateProvider.state(state.state, state.config);
        });

        $urlRouterProvider.otherwise('/');
      }

      function getStates() { return $state.get(); }
    }
  }
}());

(function () {
  //Monitor response headers for a jwt. Automatically
  //saves any auth tokens to local storage. No good inside iframe.
  //Not used for Shopify
  'use strict';

  angular.module('App')
    .factory('tokenInterceptor', tokenInterceptor);

  tokenInterceptor.$inject = ['$localStorage'];

  function tokenInterceptor($localStorage) {
    return {
        request: function (config) {
            if (!config.headers.Authorization) {
              config.headers.Authorization = $localStorage.token || 'no token in local storage';
            }

            return config;
          },

        response: function (response) {
          if (response.headers('Authorization')) {
            $localStorage.token = response.headers('Authorization');
          }

          return response;
        },
      };
  }

  angular.module('App')
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('tokenInterceptor');
    },
  ]);
}());

(function() {
  'use strict';
  
  angular
    .module('App.directives')
    .directive('footer', footer);

  function footer() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/footer.template.html',
      scope: {
          footerdata: '='
      },
      controller: DirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function DirectiveController() {
    var vm = this;
    
  }
  
}());
(function () {
  'use strict';

  angular
    .module('App.directives')
    .directive('header', header);

  function header() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/header.template.html',
      scope: {
          headerdata: '=',
        },
      controller: DirectiveController,
      controllerAs: 'header',
      bindToController: true,
    };

    return directive;
  }

  DirectiveController.$inject = ['$scope', 'routerHelper'];

  function DirectiveController(scope, routerHelper) {
    var vm = this;
    vm.brand = 'App';
    vm.navItems = getNavItems();

    init();

    function init() {
      getNavItems();
    }

    function getNavItems() {
      var states = routerHelper.getStates();
      var navItems = [];
      angular.forEach(states, function (state, key) {
        if (state.navItem) {
          navItems.push(state.navItem);
        }
      });

      return navItems;
    }

    return vm;
  }

}());

(function () {
  'use strict';

  angular
    .module('App.directives')
    .directive('navbar', navbar);

  function navbar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/navbar.template.html',
      scope: {
          navbardata: '=',
        },
      controller: DirectiveController,
      controllerAs: 'navbar',
      bindToController: true,
    };

    return directive;
  }

  DirectiveController.$inject = ['$scope', 'routerHelper'];

  function DirectiveController(scope, routerHelper) {
    var vm = this;
    vm.navItems = getNavItems();

    init();

    function init() {
      getNavItems();
    }

    function getNavItems() {
      var states = routerHelper.getStates();
      var navItems = [];
      angular.forEach(states, function (state, key) {
        if (state.navItem) {
          navItems.push(state.navItem);
        }
      });

      return navItems;
    }
  }

}());

(function () {
  'use strict';

  angular
    .module('App.directives')
    .directive('sidebar', sidebar);

  function sidebar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/sidebar.template.html',
      scope: {
          sidebardata: '=',
        },
      controller: DirectiveController,
      controllerAs: 'vm',
      bindToController: true,
    };

    return directive;
  }

  function DirectiveController() {
    var vm = this;

  }

}());
