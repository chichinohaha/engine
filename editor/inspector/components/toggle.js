const { template, $, update, Elements } = require('./button');

exports.template = template;
exports.$ = $;
exports.update = update;
exports.update = update;
exports.Elements = Object.assign(Elements, {
    isChecked: {
        displayOrder: 2,
    },
    checkMark: {
        displayOrder: 2,
    },
});
