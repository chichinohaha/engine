const { join } = require('path');

module.exports = {
    'audio-clip': join(__dirname, './assets/audio-clip.js'),
    'auto-atlas': join(__dirname, './assets/texture/auto-atlas.js'), // 复用
    'dragonbones': join(__dirname, './assets/json.js'),  // 复用
    'dragonbones-atlas': join(__dirname, './assets/json.js'), // 复用
    effect: join(__dirname, './assets/effect.js'),
    'effect-header': join(__dirname, './assets/effect-header.js'),
    'erp-texture-cube': join(__dirname, './assets/erp-texture-cube.js'),
    fbx: join(__dirname, './assets/fbx/index.js'),
    gltf: join(__dirname, './assets/fbx/index.js'), // 复用
    image: join(__dirname, './assets/image.js'),
    json: join(__dirname, './assets/json.js'),
    javascript: join(__dirname, './assets/javascript.js'),
    'label-atlas': join(__dirname, './assets/label-atlas.js'),
    material: join(__dirname, './assets/material.js'),
    prefab: join(__dirname, './assets/scene.js'), // 复用
    particle: join(__dirname, './assets/particle.js'),
    'physics-material': join(__dirname, './assets/physics-material.js'),
    'render-texture': join(__dirname, './assets/render-texture.js'),
    'render-pipeline': join(__dirname, './assets/render-pipeline.js'),
    scene: join(__dirname, './assets/scene.js'),
    'sprite-frame': join(__dirname, './assets/sprite-frame.js'),
    text: join(__dirname, './assets/text.js'),
    texture: join(__dirname, './assets/texture/index.js'),
    'texture-cube': join(__dirname, './assets/texture-cube.js'),
    typescript: join(__dirname, './assets/typescript.js'),
    'video-clip': join(__dirname, './assets/video-clip.js'),
};
