"use strict";


export default function LangsListDirective(){

    return {

        restrict: 'A',
        templateUrl: 'templates/directives/langs-list-directive.html',
        scope: {
            'langs': '='
        },
        controller: [ '$scope' , function ( $scope ){

        } ],
        link: function (){

            $('.dropdown-toggle').dropdown();

            [].forEach.call(document.querySelectorAll( 'select.cs-select' ) , function(el) {
                new SelectFx(el);
            }  )

        }

    }//

}//