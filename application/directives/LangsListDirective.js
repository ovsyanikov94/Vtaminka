"use strict";


export default function LangsListDirective(){

    return {

        restrict: 'A',
        templateUrl: 'templates/directives/langs-list-directive.html',
        scope: {
            'langs': '='
        },
        controller: [ '$scope' , function ( $scope ){

                $scope.CurrentLanguage = $scope.langs[0];
                $scope.isCreated = false;

        } ],

        link: function ( scope , element ){

            let el = element.context.querySelector('select.cs-select');
            new SelectFx(el);

        }//link

    }//LangsListDirective {}

}//LangsListDirective ()