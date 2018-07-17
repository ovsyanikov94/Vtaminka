"use strict";

const path = require('path');

module.exports = {

    mode: "production",
    devtool: "source-map",
    entry: "./application/app.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname , "public/js")
    },
    watch: true

};