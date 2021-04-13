const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden, setReadonly } = require('../utils/prop');

exports.ready = function () {
    this.elements = {
        type: {
            displayOrder: 0,
        },
        fillType: {
            displayOrder: 1,
            update(element) {
                setHidden(this.dump.value.type.value !== 3, element);
            },
        },
        fillCenter: {
            displayOrder: 2,
            update(element) {
                this.elements.fillType.update.call(this, element);
                setReadonly(this.dump.value.fillType.value !== 2, element);
            },
        },
        fillStart: {
            displayOrder: 3,
            update(element) {
                this.elements.fillType.update.call(this, element);
            },
        },
        fillRange: {
            displayOrder: 4,
            update(element) {
                this.elements.fillType.update.call(this, element);
            },
        },
    };
};