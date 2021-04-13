const { updatePropByDump, setHidden } = require('../utils/prop');

const Elements = {
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
