"use strict";


export default class LocaleService{

    constructor(
        $http ,
        HOST ,
        GET_LANGS,
        GET_TRANSLATIONS
    ){

        this._$http = $http;
        this._HOST = HOST;
        this._GET_LANGS = GET_LANGS;
        this._GET_TRANSLATIONS = GET_TRANSLATIONS;

    }

    async getLangs(){

            let response = await this._$http.get( `${this._HOST}${this._GET_LANGS}` );
            return response.data;

    }//getLangs

    async getTranslations( lang ){

        let sourceUrl = this._GET_TRANSLATIONS.replace('{{LANG}}' , lang.toUpperCase());

        let response = await this._$http.get( `${this._HOST}${sourceUrl}` );
        return response.data;


    }//getTranslations

}