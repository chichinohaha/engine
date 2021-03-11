const { join } = require('path');

module.exports = {
    effect: join(__dirname, './assets/effect.js'),
    fbx: join(__dirname, './assets/fbx/index.js'),
    image: join(__dirname, './assets/image.js'),
    prefab: join(__dirname, './assets/scene.js'), // 复用
    scene: join(__dirname, './assets/scene.js'),
    'sprite-frame': join(__dirname, './assets/sprite-frame.js'),
    texture: join(__dirname, './assets/texture.js'),
    material: join(__dirname, './assets/material.js'),
    particle: join(__dirname, './assets/particle.js'),
    json: join(__dirname, './assets/json.js'),
    'erp-texture-cube': join(__dirname, './assets/erp-texture-cube.js'),
    'effect-header': join(__dirname, './assets/effect-header.js'),
    'audio-clip': join(__dirname, './assets/audio-clip.js'),
    javascript: join(__dirname, './assets/javascript.js'),
    typescript: join(__dirname, './assets/typescript.js'),
    'gltf-mesh': join(__dirname, './assets/mesh.js'),
};
