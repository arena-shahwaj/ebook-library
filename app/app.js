angular.module('ebookApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'LoginController'
    })
    .when('/discover', {
      templateUrl: 'app/views/discover.html',
      controller: 'BooksController',
      activeTab: 'discover'
    })
    .when('/library', {
      templateUrl: 'app/views/library.html',
      controller: 'LibraryController',
      activeTab: 'library'
    })
    .when('/downloads', {
      templateUrl: 'app/views/downloads.html',
      controller: 'DownloadsController',
      activeTab: 'downloads'
    })
    .otherwise({ redirectTo: '/discover' });
    
}])
.run(['$rootScope', 'AuthService', '$location', 
  function($rootScope, AuthService, $location) {
    $rootScope.isLoggedIn = AuthService.isLoggedIn();
    
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (!AuthService.isLoggedIn() && next.templateUrl !== 'app/views/login.html') {
        $location.path('/login');
      }
    });

    $rootScope.categories = [
      { name: 'All', value: 'all' },
      { name: 'Psychology', value: 'psychology' },
      { name: 'Finance', value: 'finance' },
      { name: 'Health', value: 'health' },
      { name: 'Business', value: 'business' },
      { name: 'Fiction', value: 'fiction' },
      { name: 'Self Help', value: 'self-help' },
      { name: 'Technology', value: 'technology' }
    ];
    $rootScope.selectedCategory = 'all';
  }
]);