"use strict";


export default class LocaleService{

    constructor(
        $http ,
        HOST ,
        GET_LANGS
    ){

        this._$http = $http;
        this._HOST = HOST;
        this._GET_LANGS = GET_LANGS;
    }

    async getLangs(){

            let response = await this._$http.get( `${this._HOST}${this._GET_LANGS}` );
            return response.data;

    }//getLangs

}