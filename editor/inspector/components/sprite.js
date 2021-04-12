const { updatePropByDump, setHidden, setReadonly } = require('../utils/prop');

exports.template = `
<div class="sprite-component">
</div>
`;

exports.$ = {
    container: '.sprite-component',
};

const Elements = {
    type: {
        displayOrder: 0,
    },
    fillType: {
        displayOrder: 1,
        ready(element) {
            Elements.fillType.update.call(this, element);
        },
        update(element) {
            setHidden(this.dump.value.type.value !== 3, element);
        },
    },
    fillCenter: {
        displayOrder: 2,
        ready(element) {
            Elements.fillType.update.call(this, element);
        },
        update(element) {
            setHidden(this.dump.value.type.value !== 3, element);
            setReadonly(this.dump.value.fillType.value !== 2, element);
        },
    },
    fillStart: {
        displayOrder: 3,
        ready(element) {
            Elements.fillType.update.call(this, element);
        },
        update(element) {
            setHidden(this.dump.value.type.value !== 3, element);
        },
    },
    fillRange: {
        displayOrder: 4,
        ready(element) {
            Elements.fillType.update.call(this, element);
        },
        update(element) {
            setHidden(this.dump.value.type.value !== 3, element);
        },
    },
};

exports.update = function (dump) {
    this.dump = dump;

    updatePropByDump(this, dump, Elements);
};
