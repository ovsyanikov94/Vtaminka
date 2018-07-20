"use strict";


export default class CartService{


    constructor(){

        this.cart = [];

    }//constructor

    getCart(){
        return this.cart;
    }//getCart

    addProduct( product ){

        this.cart.push( product );

    }//addProduct

}