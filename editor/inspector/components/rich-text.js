const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden } = require('../utils/prop');

exports.ready = function () {
    this.elements = {
        string: {
            displayOrder: 0,
        },
        useSystemFont: {
            displayOrder: 1,
        },
        fontFamily: {
            displayOrder: 2,
            update(element) {
                setHidden(!this.dump.value.useSystemFont.value, element);
            },
        },
        cacheMode: {
            displayOrder: 3,
            update(element) {
                setHidden(!this.dump.value.useSystemFont.value, element);
            },
        },
        font: {
            displayOrder: 4,
            update(element) {
                setHidden(!!this.dump.value.useSystemFont.value, element);
            },
        },
    };
};
