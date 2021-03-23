/* eslint-disable @typescript-eslint/restrict-template-expressions */

const { readFileSync } = require('fs-extra');
const { join } = require('path');
const propUtils = require('../utils/prop');
/* eslint-disable @typescript-eslint/no-unsafe-return */
const excludeList = [
    'type', 'resizeMode', 'cellSize', 'alignHorizontal',
    'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'spacingX', 'spacingY',
    'horizontalDirection', 'verticalDirection',
    'alignVertical', 'paddingTop', 'paddingBottom',
    'startAxis', 'constraint', 'constraintNum', 'affectedByScale',
];
exports.style = `

`;
exports.template = readFileSync(join(__dirname, './html.html'));
const uiElements = {
    baseProps: {
        ready () {
            this.$.baseProps = this.$this.querySelectorAll('ui-prop:not(.customProp)');
            this.$.baseProps.forEach((element) => {
                element.addEventListener('change-dump', () => {
                    uiElements.baseProps.update.call(this);
                });
            });
        },
        update () {
            if (!this.$.baseProps) {
                uiElements.baseProps.ready.call(this);
            }
            this.$.baseProps.forEach((element) => {
                // v-if="dump.value.resizeMode.value === 2 && (!dumps || dumps.every(item => item.value.resizeMode.value == 2))"
                const key = element.id;
                let isShow = this.dump.value[key].visible;
                if (element.hasAttribute('showflag')) {
                    const str = element.getAttribute('showflag');
                    const equalJudgeStrPair = str.split('==');
                    const unequalJudgeStrPair = str.split('!=');
                    if (equalJudgeStrPair.length == 2) {
                        const left = equalJudgeStrPair[0];
                        const right = equalJudgeStrPair[1];
                        isShow = isShow && (this.dump.value[left].value == right && (this.dump.values.length === 1 || this.dump.values.every((item) =>  item.value[key].value == right)));
                    } else if (unequalJudgeStrPair.length == 2) {
                        const left = unequalJudgeStrPair[0];
                        const right = unequalJudgeStrPair[1];
                        isShow = isShow && !(this.dump.value[left].value == right && (this.dump.values.length === 1 || this.dump.values.every((item) =>  item.value[key].value == right)));
                    }
                }
                if (isShow) {
                    element.render(this.dump.value[key]);
                }
                element.style = isShow ? '' : 'display: none;';
            });
        },
    },
    customProps: {
        update () {
            this.$.customProps.replaceChildren(...propUtils.getCustomPropElements(excludeList, this.dump, (element, prop) => {
                element.className = 'customProp';
                if (prop.dump.visible) {
                    element.render(prop.dump);
                }
            }));
        },
    },
};
exports.$ = {
    customProps: '#customProps',
};
exports.ready = function () {
    for (const key in uiElements) {
        const element = uiElements[key];
        if (typeof element.ready === 'function') {
            element.ready.call(this);
        }
    }
};
exports.update = function (dump) {
    for (const key in dump.value) {
        const info = dump.value[key];
        if (dump.values) {
            info.values = dump.values.map((value) => value[key].value);
        }
    }
    this.dump = dump;
    for (const key in uiElements) {
        const element = uiElements[key];
        if (typeof element.update === 'function') {
            element.update.call(this);
        }
    }
};
