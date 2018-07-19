"use strict";


export default  function ProductDirective( ){

    return {

        restrict: 'A',
        scope: {
            product: '='
        },
        templateUrl: 'templates/directives/product-directive.html',
        controller: [ '$scope' , function ( $scope ){

        } ],
        link: function ( scope , element ){

            new SelectFx(element.context.querySelector('select.cs-select'));

        }
    }

}