const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

exports.ready = function () {
    this.elements = {
        resourceType: {
            displayOrder: 0,
        },
        remoteURL: {
            displayOrder: 1,
        },
    }
};