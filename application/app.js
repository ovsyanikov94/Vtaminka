"use strict";

//====================CONTROLLERS===========================//
import MainController from './controllers/MainController';

//====================SERVICES==============================//
import LocaleService from './services/LocaleService';
import ProductService from './services/ProductService';

//====================FILTERS==============================//

//====================DIRECTIVES==============================//
import LangsListDirective from './directives/LangsListDirective';
import ProductDirective from './directives/ProductDirective';

angular.module('VtaminkaApplication.controllers' , []);
angular.module('VtaminkaApplication.services' , []);
angular.module('VtaminkaApplication.filters' , []);
angular.module('VtaminkaApplication.directives' , []);
angular.module('VtaminkaApplication.constants' , []);

//====================CONTROLLERS DECLARATIONS================================//
angular.module('VtaminkaApplication.controllers')
    .controller( 'MainController' , [ '$scope' , 'LocaleService' , MainController ]);

//====================CONSTANTS================================//
angular.module('VtaminkaApplication.constants')
       .constant('HOST' , 'http://localhost:63342/Vtaminka/public/');

angular.module('VtaminkaApplication.constants')
    .constant('GET_LANGS' , 'i18n/langs.json');

//GET_PRODUCTS
angular.module('VtaminkaApplication.constants')
    .constant('GET_PRODUCTS' , 'products/products-list.json');

//====================SERVICES DECLARATIONS===================//
angular.module('VtaminkaApplication.services')
    .service('LocaleService' , [ '$http', 'HOST' , 'GET_LANGS' , LocaleService ]);

angular.module('VtaminkaApplication.services')
    .service('ProductService' , [ '$http', 'HOST' , 'GET_PRODUCTS' , ProductService ]);

//====================DIRECTIVES DECLARATIONS===================//
angular.module('VtaminkaApplication.directives')
    .directive('langsListDirective' , [ LangsListDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('productDirective' , [ ProductDirective ]);


let app = angular.module('VtaminkaApplication',[
    'angular-loading-bar',
    'LocalStorageModule',
    'VtaminkaApplication.controllers',
    'VtaminkaApplication.filters',
    'VtaminkaApplication.services',
    'VtaminkaApplication.directives',
    'VtaminkaApplication.constants',
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
                "controller": [ "$scope" , "langs" , function ($scope , langs){
                    $scope.langs = langs;
                } ]
            },
            "content": {
                'templateUrl': "templates/home/home.html",
                controller: [ '$scope' , 'products' , function ($scope , products){

                    $scope.products = products;

                } ]
            },
            "footer": {
                'templateUrl': "templates/footer.html",
            }
        },
        'resolve': {

            'products': [ 'ProductService' , function ( ProductService ){
                return ProductService.getProducts();
            } ],
            'langs': [ 'LocaleService' , function ( LocaleService ){
                return LocaleService.getLangs();
            } ]

        }
    });

} ] );

app.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

        }
    ]);
