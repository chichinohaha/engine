const { template, $, update } = require('./base');

exports.template = template;
exports.$ = $;
exports.update = update;

const { setHidden } = require('../utils/prop');

// 这样写是因为 cc.Toggle 可以复用这块代码
exports.elements = {
    target: {
        displayOrder: 0,
    },
    interactable: {
        displayOrder: 1,
    },
    transition: {
        displayOrder: 3,
    },
    normalColor: {
        update(element) {
            setHidden(this.dump.value.transition.value !== 1, element);
        },
    },
    pressedColor: {
        update(element) {
            this.elements.normalColor.update.call(this, element);
        },
    },
    hoverColor: {
        update(element) {
            this.elements.normalColor.update.call(this, element);
        },
    },
    disabledColor: {
        update(element) {
            this.elements.normalColor.update.call(this, element);
        },
    },
    normalSprite: {
        update(element) {
            setHidden(this.dump.value.transition.value !== 2, element);
        },
    },
    pressedSprite: {
        update(element) {
            this.elements.normalSprite.update.call(this, element);
        },
    },
    hoverSprite: {
        update(element) {
            this.elements.normalSprite.update.call(this, element);
        },
    },
    disabledSprite: {
        update(element) {
            this.elements.normalSprite.update.call(this, element);
        },
    },
    zoomScale: {
        update(element) {
            setHidden(this.dump.value.transition.value !== 3, element);
        },
    },
    duration: {
        update(element) {
            this.elements.zoomScale.update.call(this, element);
        },
    },
}

exports.ready = function () {
    this.elements = exports.elements;
};
