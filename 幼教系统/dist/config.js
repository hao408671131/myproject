'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

exports.default = {
    viewsPath: (0, _path.join)(__dirname, '../views'),
    publicPath: (0, _path.join)(__dirname, '../public'),
    uploadPath: (0, _path.join)(__dirname, '../public/uploads')
};