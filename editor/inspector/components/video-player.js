const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden } = require('../utils/prop');

exports.ready = function () {
    this.elements = {
        resourceType: {
            displayOrder: 0,
        },
        remoteURL: {
            displayOrder: 1,
            update(element) {
                setHidden(this.dump.value.resourceType.value !== 0, element);
            },
        },
        clip: {
            displayOrder: 1,
            update(element) {
                setHidden(this.dump.value.resourceType.value === 0, element);
            },
        },
    }
};