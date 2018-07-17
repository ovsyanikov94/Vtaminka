"use strict";

//====================CONTROLLERS===========================//
import HomeController from './controllers/HomeController';

//====================SERVICES==============================//
import LocaleService from './services/LocaleService';

//====================FILTERS==============================//

//====================DIRECTIVES==============================//
import LangsListDirective from './directives/LangsListDirective';

angular.module('VtaminkaApplication.controllers' , []);
angular.module('VtaminkaApplication.services' , []);
angular.module('VtaminkaApplication.filters' , []);
angular.module('VtaminkaApplication.directives' , []);
angular.module('VtaminkaApplication.constants' , []);

//====================CONSTANTS================================//
angular.module('VtaminkaApplication.constants')
       .constant('HOST' , 'http://localhost:63342/Vtaminka/public/');

angular.module('VtaminkaApplication.constants')
    .constant('GET_LANGS' , 'i18n/langs.json');

//====================SERVICES DECLARATIONS===================//
angular.module('VtaminkaApplication.services')
    .service('LocaleService' , [ '$http', 'HOST' , 'GET_LANGS' , LocaleService ]);

//====================DIRECTIVES DECLARATIONS===================//
angular.module('VtaminkaApplication.directives')
    .directive('langsListDirective' , [ LangsListDirective ]);


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
                "controller": [ '$scope' , 'langs' , function ( $scope , langs ){
                    $scope.langs = langs;
                } ]
            },
            "content": {
                'templateUrl': "templates/home.html",
                'controller': [ '$scope' , HomeController ],
            },
            "footer": {
                'templateUrl': "templates/footer.html",
            }
        },
        'resolve': {
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
