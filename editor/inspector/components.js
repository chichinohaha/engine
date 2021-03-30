const { join } = require('path');

module.exports = {
    // 'cc.UITransform': join(__dirname, './components/class.js'),
    'cc.PrefabLink': join(__dirname, './components/prefab-link.js'),
    'cc.PageView': join(__dirname, './components/page-view.js'),
    'cc.VideoPlayer': join(__dirname, './components/video-player.js'),
};
