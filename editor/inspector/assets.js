'use strict';

const { join } = require('path');

module.exports = {
    'image': join(__dirname, './assets/image.js'),
    'prefab': join(__dirname, './assets/scene.js'), // 复用
    'scene': join(__dirname, './assets/scene.js'),
    'sprite-frame': join(__dirname, './assets/sprite-frame.js'),
    'texture': join(__dirname, './assets/texture.js'),
    'material': join(__dirname, './assets/material.js'),
    'javascript': join(__dirname, './assets/javascript.js'),
};
