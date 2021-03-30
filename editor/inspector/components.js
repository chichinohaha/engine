const { join } = require('path');

module.exports = {
    // 'cc.UITransform': join(__dirname, './components/class.js'),
    'cc.PageView': join(__dirname, './components/page-view.js'),
    'cc.SkinnedMeshBatchRenderer': join(__dirname, './components/batched-skinning-model.js'),
    'cc.Button': join(__dirname, './components/button.js'),
};
