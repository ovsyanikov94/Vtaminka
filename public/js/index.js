!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);class o{constructor(e,t,r){e.searchObject=t.getSearchObject(),e.phones=r}}class n{constructor(e,t){e.phone=t,e.thumbnail=`${t.images[0]}`}}angular.module("PhoneApplication.controllers",[]),angular.module("PhoneApplication.services",[]),angular.module("PhoneApplication.filters",[]),angular.module("PhoneApplication.directives",[]),angular.module("PhoneApplication.controllers").controller("CartController",["$scope","CartService",class{constructor(e,t){e.cart=t.getCart(),e.RemoveItem=function(e){t.removePhone(e)},e.ClearCart=function(){t.clearCart()}}}]),angular.module("PhoneApplication.filters").filter("SearchPhonesFilter",function(){return function(e,t){return e.filter(e=>-1!==e.name.toLowerCase().indexOf(t.toLowerCase()))}}),angular.module("PhoneApplication.filters").filter("DescriptionFilter",function(){return function(e,t){return e.length<t?e:`${e.substring(0,t)}...`}}),angular.module("PhoneApplication.controllers").controller("ExampleController",["$scope","PhoneService",(e,t)=>{e.searchObject=t.getSearchObject()}]),angular.module("PhoneApplication.services").service("CartService",["localStorageService","PhoneService",class{constructor(e,t){e.get("cart")?this.cart=e.get("cart"):this.cart=[],this.localStorageService=e,this._phoneService=t}getCart(){return this.cart}addPhone(e){if(this.cart.some(t=>t.id===e.id))for(let t=0;t<this.cart.length;t++){let r=this.cart[t];if(r.id===e.id){r.amount++;break}}else this.cart.push(this._getSimplePhone(e));this.localStorageService.set("cart",this.cart)}_getSimplePhone(e){return{id:e.id,amount:e.amount||1,name:e.name}}clearCart(){this.localStorageService.clearAll(),this.cart.length=0}OnItemRemove(e){this._removeCallback=e}removePhone(e){this.cart.splice(e,1),this._removeCallback&&this._removeCallback(e),this.localStorageService.set("cart",this.cart)}async getFullPhones(){let e=[];for(let t=0;t<this.cart.length;t++){let r=this.cart[t],o=await this._phoneService.getSinglePhone(`phones/${r.id}.json`);o.amount=r.amount,e.push(o)}return e}}]),angular.module("PhoneApplication.services").service("PhoneService",["$http",class{constructor(e){this.$http=e,this.searchObject={searchString:""}}async getPhones(e){console.log("getPhones!");try{return(await this.$http.get(e)).data}catch(e){return console.log("Exception: getPhones",e),[]}}getSearchObject(){return this.searchObject}async getSinglePhone(e){try{return(await this.$http.get(e)).data}catch(e){return console.log("Exception: getSinglePhone: ",e),null}}}]),angular.module("PhoneApplication.directives").directive("phonesListDirective",function(){return{restrict:"EAC",scope:{queryObject:"=searchObject",phones:"=phonesListArray"},templateUrl:"templates/directives/phones-list.html",controller:["$scope",function(e){e.phoneImageClick=function(e){alert(e)}}]}}),angular.module("PhoneApplication.directives").directive("singlePhoneDirective",function(){return{restrict:"EA",scope:{phone:"=",thumbnail:"="},templateUrl:"templates/directives/single-phone-directive.html",controller:["$scope","CartService",function(e,t){e.addPhoneToCart=function(e){t.addPhone(e)},e.setThumbnail=function(t){e.thumbnail=t}}],link:function(e,t,r,o){$(document).ready(()=>{$("#PhonesOwlCarousel").owlCarousel({items:2,nav:!0,autoWidth:!0,margin:10})})}}}),angular.module("PhoneApplication.directives").directive("cartDirective",function(){return{restrict:"AE",scope:{phones:"="},templateUrl:"templates/directives/cart-directive.html",controller:["$scope","CartService",function(e,t){e.cart=t.getCart(),t.OnItemRemove(t=>{e.phones.splice(t,1)}),e.SetAmount=function(t,r){e.cart[t].amount+=r,e.phones[t].amount+=r,0===e.cart[t].amount&&(e.cart.splice(t,1),e.phones.splice(t,1))},e.RemovePhone=function(t){e.cart.splice(t,1),e.phones.splice(t,1)}}]}});let i=angular.module("PhoneApplication",["angular-loading-bar","LocalStorageModule","PhoneApplication.controllers","PhoneApplication.filters","PhoneApplication.services","PhoneApplication.directives","ngRoute","ui.router"]);i.config(["$stateProvider","$urlRouterProvider","localStorageServiceProvider","cfpLoadingBarProvider",(e,t,r,i)=>{t.otherwise("/home"),i.includeSpinner=!0,i.includeBar=!0,r.setStorageCookie(7,"/"),r.setStorageCookieDomain("localhost"),e.state("home",{url:"/home",views:{header:{templateUrl:"templates/header.html"},content:{templateUrl:"templates/catalogue.html",controller:["$scope","PhoneService","phones",o]}},resolve:{phones:["PhoneService",function(e){return e.getPhones("phones/phones.json")}]}}),e.state("singlePhone",{url:"/phone/:phoneID",views:{header:{templateUrl:"templates/header.html"},content:{templateUrl:"templates/single-phone.html",controller:["$scope","phone",n]}},resolve:{phone:["PhoneService","$stateParams",function(e,t){return e.getSinglePhone(`phones/${t.phoneID}.json`)}]}}),e.state("cart",{url:"/cart",views:{header:{templateUrl:"templates/header.html"},content:{templateUrl:"templates/cart.html",controller:["$scope","phonesList",function(e,t){e.phones=t}]}},resolve:{phonesList:["CartService",function(e){return e.getFullPhones()}]}})}]),i.run(["$rootScope","$state","$stateParams",function(e,t,r){}])}]);
//# sourceMappingURL=index.js.map