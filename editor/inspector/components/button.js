const { updatePropByDump, setHidden } = require('../utils/prop');

const Elements = {
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
            Elements.normalColor.update.call(this, element);
        },
    },
    hoverColor: {
        update(element) {
            Elements.normalColor.update.call(this, element);
        },
    },
    disabledColor: {
        update(element) {
            Elements.normalColor.update.call(this, element);
        },
    },
    normalSprite: {
        update(element) {
            setHidden(this.dump.value.transition.value !== 2, element);
        },
    },
    pressedSprite: {
        update(element) {
            Elements.normalSprite.update.call(this, element);
        },
    },
    hoverSprite: {
        update(element) {
            Elements.normalSprite.update.call(this, element);
        },
    },
    disabledSprite: {
        update(element) {
            Elements.normalSprite.update.call(this, element);
        },
    },
    zoomScale: {
        update(element) {
            setHidden(this.dump.value.transition.value !== 3, element);
        },
    },
    duration: {
        update(element) {
            Elements.zoomScale.update.call(this, element);
        },
    },
}

exports.template = `
<div class="component-container">
</div>
`;

exports.$ = {
    componentContainer: '.component-container',
};

exports.update = function (dump) {
    this.dump = dump;
    updatePropByDump(this, dump, Elements);
};

exports.Elements = Elements;