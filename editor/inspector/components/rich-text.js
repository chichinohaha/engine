const { updatePropByDump, setHidden } = require('../utils/prop');

const Elements = {
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
