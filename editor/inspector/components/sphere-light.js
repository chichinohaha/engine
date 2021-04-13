const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden } = require('../utils/prop');

exports.ready = function () {
    this.elements = {
        term: {
            displayOrder: 0,
        },
        luminousPower: {
            displayOrder: 1,
            update(element) {
                setHidden(this.dump.value.term.value !== 0, element);
            },
        },
        luminance: {
            displayOrder: 1,
            update(element) {
                setHidden(this.dump.value.term.value !== 1, element);
            },
        },
        staticSettings: {
            displayOrder: 110,
        },
    };
};
