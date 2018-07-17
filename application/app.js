"use strict";

//====================CONTROLLERS===========================//
import HomeController from './controllers/HomeController';

//====================SERVICES==============================//


//====================FILTERS==============================//

//====================DIRECTIVES==============================//


angular.module('SkeletonApplication.controllers' , []);
angular.module('SkeletonApplication.services' , []);
angular.module('SkeletonApplication.filters' , []);
angular.module('SkeletonApplication.directives' , []);


let app = angular.module('SkeletonApplication',[
    'angular-loading-bar',
    'LocalStorageModule',
    'SkeletonApplication.controllers',
    'SkeletonApplication.filters',
    'SkeletonApplication.services',
    'SkeletonApplication.directives',
    'ngRoute',
    'ui.router',
]);

app.config( [
    '$stateProvider',
    '$urlRouterProvider',
    'localStorageServiceProvider' ,
    'cfpLoadingBarProvider',
    ($stateProvider , $urlRouterProvider , localStorageServiceProvider , cfpLoadingBarProvider)=>{

    $urlRouterProvider.otherwise('/home');

    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;

    localStorageServiceProvider.setStorageCookie( 7 , '/' );
    localStorageServiceProvider.setStorageCookieDomain('localhost');

    $stateProvider.state('home' , {
        'url': '/home',
        'views':{
            "header":{
                "templateUrl": "templates/header.html",
            },
            "content": {
                'templateUrl': "templates/home.html",
                'controller': [ '$scope' , HomeController ],
            },
            "footer": {
                'templateUrl': "templates/footer.html",
            }
        },
    });

} ] );

app.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

        }
    ]);
