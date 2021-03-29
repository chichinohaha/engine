'use strict';

const { join } = require('path');

module.exports = {
    image: join(__dirname, './assets/image-preview.js'),
    texture: join(__dirname, './assets/image-preview.js'),
    'sprite-frame': join(__dirname, './assets/image-preview.js'),
    fbx: join(__dirname, './assets/fbx/preview.js'),
    gltf: join(__dirname, './assets/fbx/preview.js'), // 复用
};
