const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden } = require('../utils/prop');

exports.ready = function () {
    this.elements = {
        horizontal: {
            displayOrder: 0,
        },
        horizontalScrollBar: {
            displayOrder: 1,
            update(element) {
                setHidden(!this.dump.value.horizontal.value, element);
            },
        },
        vertical: {
            displayOrder: 2,
        },
        verticalScrollBar: {
            displayOrder: 3,
            update(element) {
                setHidden(!this.dump.value.vertical.value, element);
            },
        },
        inertia: {
            displayOrder: 4,
        },
        brake: {
            displayOrder: 5,
            update(element) {
                setHidden(!this.dump.value.inertia.value, element);
            },
        },
        elastic: {
            displayOrder: 6,
        },
        bounceDuration: {
            displayOrder: 7,
            update(element) {
                setHidden(!this.dump.value.elastic.value, element);
            },
        },
    };
};
