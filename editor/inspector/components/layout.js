const { updatePropByDump, setHidden } = require('../utils/prop');
const excludeList = [
     'constraint', 'constraintNum', '',
];
const Elements = {
    type: {
        displayOrder: 0,
    },
    affectedByScale: {
        displayOrder: 1,
        update(element) {
            setHidden(this.dump.value.type.value === 0, element);
        },
    },
    resizeMode: {
        displayOrder: 2,
        update(element) {
            setHidden(this.dump.value.type.value === 0, element);
        },
    },
    cellSize: {
        displayOrder: 3,
        update(element) {
            setHidden(this.dump.value.type.value !== 3 &&  this.dump.value.resizeMode.value !== 2, element);
        },
    },
    startAxis: {
        displayOrder: 4,
        update(element) {
            setHidden(this.dump.value.type.value !== 3, element);
        },
    },
    paddingLeft: {
        displayOrder: 4,
        update(element) {
            setHidden(this.dump.value.type.value === 0 || this.dump.value.type.value === 2, element);
        },
    },
    paddingRight: {
        displayOrder: 5,
        update(element) {
            Elements.paddingLeft.update.call(this, element);
        },
    },
    paddingTop: {
        displayOrder: 4,
        update(element) {
            setHidden(this.dump.value.type.value === 0 || this.dump.value.type.value === 1, element);
        },
    },
    paddingBottom: {
        displayOrder: 5,
        update(element) {
            Elements.paddingTop.update.call(this, element);
        },
    },
    spacingX: {
        displayOrder: 6,
        update(element) {
            Elements.paddingLeft.update.call(this, element);
        },
    },
    spacingY: {
        displayOrder: 7,
        update(element) {
            Elements.paddingTop.update.call(this, element);
        },
    },
    horizontalDirection: {
        displayOrder: 8,
        update(element) {
            Elements.paddingLeft.update.call(this, element);
        },
    },
    verticalDirection: {
        displayOrder: 9,
        update(element) {
            Elements.paddingTop.update.call(this, element);
        },
    },
    alignHorizontal: {
        displayOrder: 10,
        update(element) {
            Elements.paddingLeft.update.call(this, element);
        },
    },
    alignVertical: {
        displayOrder: 11,
        update(element) {
            Elements.paddingTop.update.call(this, element);
        },
    },
    constraint: {
        displayOrder: 12,
        update(element) {
            setHidden(this.dump.value.type.value !== 3, element);
        },
    },
    constraintNum: {
        displayOrder: 13,
        update(element) {
            setHidden(this.dump.value.type.value !== 3 || this.dump.value.constraint.value === 0, element);
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