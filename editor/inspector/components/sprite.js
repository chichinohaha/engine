const { updatePropByDump, setHidden, setReadonly } = require('../utils/prop');

const Elements = {
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
            Elements.fillType.update.call(this, element);
            setReadonly(this.dump.value.fillType.value !== 2, element);
        },
    },
    fillStart: {
        displayOrder: 3,
        update(element) {
            Elements.fillType.update.call(this, element);
        },
    },
    fillRange: {
        displayOrder: 4,
        update(element) {
            Elements.fillType.update.call(this, element);
        },
    },
};

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
