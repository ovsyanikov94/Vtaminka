"use strict";

export default class MainController{

    constructor( $scope , LocaleService , $translate ){

        $scope.updateTranslations = function ( lang ){
            $translate.use(lang);
        }

    }//constructor

}