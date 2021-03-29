/* eslint-disable @typescript-eslint/no-unsafe-return */

const { readFileSync } = require('fs-extra');
const { join } = require('path');
const propUtils = require('../utils/prop');

exports.template = `
<div class="particle-system-component">
    <div class="content">
        <ui-prop
            type="dump"
            key="duration"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="capacity"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="loop"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="playOnAwake"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="prewarm"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="simulationSpace"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="simulationSpeed"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startDelay"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startLifetime"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startColor"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="scaleSpace"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startSize3D"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startSizeX"
        ></ui-prop>
        <!--TODO: if(!startSize3D.value) change the name to startSize-->

        <ui-prop
            type="dump"
            showflag="startSize3D.value"
            key="startSizeY"
        ></ui-prop>

        <ui-prop
            type="dump"
            showflag="startSize3D.value"
            key="startSizeZ"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startSpeed"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startRotation3D"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startRotationX"
            showflag="startSize3D.value"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="startRotationY"
            showflag="startSize3D.value"
        ></ui-prop>
        <ui-prop
            type="dump"
            showflag="startRotation3D.value"
            key="startRotationZ"
        ></ui-prop>
        <ui-prop
            type="dump"
            showflag="!startRotation3D.value"
            name="StartRotation"
            key="startRotationZ"
        >
        </ui-prop>

        <ui-prop
            type="dump"
            key="gravityModifier"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="rateOverTime"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="rateOverDistance"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="bursts"
        ></ui-prop>

        <ui-prop
            type="dump"
            key="enableCulling"
        ></ui-prop>

        <ui-section
            class="config"
            key="shapeModule"
        >
            <ui-prop
                slot="header"
                class="header"
                type="dump"
                key="shapeModule.value.enable"
                labelflag="shapeModule"
                empty="true"
            >
                <ui-checkbox></ui-checkbox>
                <ui-label></ui-label>
            </ui-prop>
            <ui-prop
                type="dump"
                key="shapeModule.value.shapeType"
            ></ui-prop>

            <ui-prop
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Box,Cone,Sphere,Hemisphere"
                empty="true"
                type="dump"
                key="shapeModule.value.emitFrom"
            >
                <ui-select id="emitFromSelect"></ui-select>
            </ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Circle,Cone,Sphere,Hemisphere"
                key="shapeModule.value.radius"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Circle,Cone,Sphere,Hemisphere"
                key="shapeModule.value.radiusThickness"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Cone"
                key="shapeModule.value.angle"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Circle,Cone"
                key="shapeModule.value.arc"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Circle,Cone"
                key="shapeModule.value.arcMode"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Circle,Cone"
                key="shapeModule.value.arcSpread"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Circle,Cone"
                key="shapeModule.value.arcSpeed"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Cone"
                key="shapeModule.value.length"
            ></ui-prop>

            <ui-prop
                type="dump"
                showflag="checkEnumInSubset,shapeModule.value.shapeType,Box"
                key="shapeModule.value.boxThickness"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.position"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.rotation"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.scale"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.alignToDirection"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.randomDirectionAmount"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.sphericalDirectionAmount"
            ></ui-prop>

            <ui-prop
                type="dump"
                key="shapeModule.value.randomPositionAmount"
            ></ui-prop>

        </ui-section>
        <ui-section
            class="config" 
            key="velocityOvertimeModule"
            autoflag="true"
        ></ui-section>
        <ui-section
            class="config" 
            key="forceOvertimeModule"
            autoflag="true"
        ></ui-section>
        
        <ui-section
            empty="true"
            class="config"
            key="sizeOvertimeModule"
        >
            <ui-prop
                slot="header"
                class="header"
                type="dump"
                key="sizeOvertimeModule.value.enable"
                labelflag="sizeOvertimeModule"
                empty="true"
            >
                <ui-checkbox></ui-checkbox>
                <ui-label></ui-label>
            </ui-prop>
            <ui-prop
                type="dump"
                key="sizeOvertimeModule.value.separateAxes"
            ></ui-prop>
            <ui-prop
                type="dump"
                showflag="!sizeOvertimeModule.value.separateAxes.value"
                key="sizeOvertimeModule.value.size"
            >
            </ui-prop>
            <ui-prop
                type="dump"
                showflag="sizeOvertimeModule.value.separateAxes.value"
                key="sizeOvertimeModule.value.x"
            >
            </ui-prop>
            <ui-prop
                type="dump"
                showflag="sizeOvertimeModule.value.separateAxes.value"
                key="sizeOvertimeModule.value.y"
            >
            </ui-prop>
            <ui-prop
                type="dump"
                showflag="sizeOvertimeModule.value.separateAxes.value"
                key="sizeOvertimeModule.value.z"
            ></ui-prop>

        </ui-section>

        <ui-section
            empty="true"
            class="config"
            key="rotationOvertimeModule"
        >

            <ui-prop
                slot="header"
                class="header"
                type="dump"
                key="rotationOvertimeModule.value.enable"
                labelflag="rotationOvertimeModule"
                empty="true"
            >
                <ui-checkbox></ui-checkbox>
                <ui-label></ui-label>
            </ui-prop>
            <ui-prop
                type="dump"
                key="rotationOvertimeModule.value.separateAxes"
            >
            </ui-prop>
            <ui-prop
                type="dump"
                showflag="rotationOvertimeModule.value.separateAxes.value"
                key="rotationOvertimeModule.value.x"
            ></ui-prop>
            <ui-prop
                type="dump"
                showflag="rotationOvertimeModule.value.separateAxes.value"
                key="rotationOvertimeModule.value.y"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="rotationOvertimeModule.value.z"
            ></ui-prop>

        </ui-section>
        <ui-section
        class="config" 
        key="colorOverLifetimeModule"
        autoflag="true"
        ></ui-section>
        <ui-section
        class="config" 
        key="textureAnimationModule"
        autoflag="true"
        ></ui-section>
        <ui-section
            type="dump"
            showflag="!renderer.value.useGPU.value"
            key="limitVelocityOvertimeModule"
            class="config"
            autoflag="true"
        ></ui-section>
        <ui-section
            empty="true"
            class="config"
            showflag="!renderer.value.useGPU.value"
            key="trailModule"
        >
            <ui-prop
                slot="header"
                class="header"
                type="dump"
                key="trailModule.value.enable"
                labelflag="trailModule"
                empty="true"
            >
                <ui-checkbox></ui-checkbox>
                <ui-label></ui-label>
            </ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.mode"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.lifeTime"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.minParticleDistance"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.space"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.textureMode"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.widthFromParticle"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.widthRatio"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.colorFromParticle"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.colorOverTrail"
            ></ui-prop>
            <ui-prop
                type="dump"
                key="trailModule.value.colorOvertime"
            ></ui-prop>

        </ui-section>

        <ui-prop
            type="dump"
            key="renderer"
        ></ui-prop>

    </div>

    <!-- 渲染其他没有接管的数据 -->
    <div id="customProps">
    </div>
</div>
`;
const excludeList = [
    'duration', 'capacity', 'loop', 'playOnAwake', 'prewarm',
    'simulationSpace', 'simulationSpeed', 'startDelay',
    'startLifetime', 'startColor', 'scaleSpace', 'startSize3D',
    'startSizeX', 'startSizeY', 'startSizeZ', 'startSpeed',
    'startRotation3D', 'startRotationX', 'startRotationY',
    'startRotationZ', 'gravityModifier', 'rateOverTime',
    'rateOverDistance', 'bursts', 'shapeModule',
    'velocityOvertimeModule', 'forceOvertimeModule', 'sizeOvertimeModule',
    'rotationOvertimeModule', 'colorOverLifetimeModule', 'textureAnimationModule',
    'trailModule', 'renderer', 'enableCulling',
];

exports.methods = {

    getObjectByKey (target, key) {
        let params = [];
        if (typeof key === 'string') {
            params = key.split('.');
        } else if (key instanceof Array) {
            params = key;
        }
        if (params.length > 0) {
            const value = params.shift();
            return this.getObjectByKey(target[value], params);
        } else {
            return target;
        }
    },
    /**
     * 根据 dump 数据，获取名字
     */
    getName (value) {
        if (!value) {
            return '';
        }

        if (value.displayName) {
            return value.displayName;
        }

        let name = value.name || '';

        name = name.replace(/^\S/, (str) => str.toUpperCase());
        name = name.replace(/_/g, (str) => ' ');
        name = name.replace(/ \S/g, (str) => ` ${str.toUpperCase()}`);

        return name.trim();
    },

    /**
     * 根据 dump 数据，获取 tooltip
     * @param value
     */
    getTitle (value) {
        if (value.tooltip) {
            if (!value.tooltip.startsWith('i18n:')) {
                return value.tooltip;
            }
            return Editor.I18n.t(`ENGINE.${value.tooltip.substr(5)}`) || value.tooltip;
        }

        return this.getName(value);
    },

    _onApplyClick () {
        Editor.Message.send('scene', 'execute-component-method', {
            uuid: this.dump.value.uuid.value,
            name: 'cook',
            args: [],
        });

        this.dump.values
            && this.dump.values.forEach((dump) => {
                Editor.Message.send('scene', 'execute-component-method', {
                    uuid: dump.value.uuid.value,
                    name: 'combine',
                    args: [],
                });
            });
    },

    getEnumName (type, value) {
        for (const opt of type.enumList) {
            if (opt.value === value) {
                return opt.name;
            }
        }
        return String();
    },

    getEnumObjFromName (type, ...name) {
        const enumMap = {};
        for (const opt of type.enumList) {
            enumMap[opt.name] = {
                name: opt.name,
                value: opt.value,
            };
        }
        return name.map((value) => enumMap[value]);
    },

    getShapeTypeEmitFrom (shapeType) {
        const shapeTypeName = this.getEnumName(this.dump.value.shapeModule.value.shapeType, shapeType);
        let emitEnum = null;
        switch (shapeTypeName) {
        case 'Box':
            emitEnum = this.getEnumObjFromName(this.dump.value.shapeModule.value.emitFrom, 'Volume', 'Shell', 'Edge');
            break;
        case 'Cone':
            emitEnum = this.getEnumObjFromName(this.dump.value.shapeModule.value.emitFrom, 'Base', 'Shell', 'Volume');
            break;
        case 'Sphere':
            emitEnum = this.getEnumObjFromName(this.dump.value.shapeModule.value.emitFrom, 'Volume', 'Shell');
            break;
        case 'Hemisphere':
            emitEnum = this.getEnumObjFromName(this.dump.value.shapeModule.value.emitFrom, 'Volume', 'Shell');
            break;
        default:
            emitEnum = [];
        }
        return emitEnum;
    },

    checkEnumInSubset (enumValue, ...subset) {
        const optName = this.getEnumName(enumValue, enumValue.value);
        for (const name of subset) {
            if (name === optName) {
                return true;
            }
        }
        return false;
    },
};

const uiElements = {
    uiSections: {
        ready () {
            this.$.uiSections = this.$this.querySelectorAll('ui-section[autoflag="true"]');
        },
        update () {
            this.$.uiSections.forEach((element) => {
                const key = element.getAttribute('key');
                const showflag = element.getAttribute('showflag');
                if (showflag) {
                    if (typeof showflag === 'string') {
                        if (showflag.startsWith('!')) {
                            if (this.getObjectByKey(this.dump.value, showflag.slice(1))) {
                                // continue when don't show
                                return true;
                            }
                        } else if (!this.getObjectByKey(this.dump.value, showflag)) {
                            // continue when don't show
                            return true;
                        }
                    }
                }
                const children = [];
                const header = document.createElement('ui-prop');
                header.setAttribute('slot', 'header');
                header.setAttribute('type', 'dump');
                header.setAttribute('empty', 'true');
                header.className = 'header';
                header.dump = this.dump;
                const checkbox = document.createElement('ui-checkbox');
                checkbox.addEventListener('change', (event) => {
                    this.getObjectByKey(this.dump.value, key).value.enable.value = event.target.value;
                    header.dispatch('change-dump');
                });
                checkbox.setAttribute('value', this.getObjectByKey(this.dump.value, key).value.enable.value);
                const label = document.createElement('ui-label');
                label.setAttribute('value', this.getName(this.getObjectByKey(this.dump.value, key)));
                label.setAttribute('tooltip', this.getTitle(this.getObjectByKey(this.dump.value, key)));
                header.replaceChildren(...[checkbox, label]);
                children.push(header);
                const propMap = this.getObjectByKey(this.dump.value, key).value;
                for (const propKey in propMap) {
                    const dump = propMap[propKey];
                    if (propKey === 'enable') {
                        continue;
                    }
                    const uiProp = document.createElement('ui-prop');
                    uiProp.setAttribute('type', 'dump');
                    const isShow = dump.visible;
                    if (isShow) {
                        uiProp.render(dump);
                        children.push(uiProp);
                    }
                }
                element.replaceChildren(...children);
            });
        },
    },
    emitFromSelect: {
        ready () {
            this.$.emitFromSelect.addEventListener('change', (event) => {
                this.dump.value.shapeModule.value.emitFrom.value = event.target.value;
                this.$.emitFromSelect.parentNode.dispatch('change-dump');
            });
        },
        update () {
            this.$.emitFromSelect.setAttribute('value', this.dump.value.shapeModule.value.emitFrom.value);
            const datas = this.getShapeTypeEmitFrom(this.dump.value.shapeModule.value.shapeType.value);
            const children = datas.map((data) => {
                const child = document.createElement('option');
                child.innerHTML = data.name;
                return child;
            });
            this.$.emitFromSelect.replaceChildren(...children);
        },
    },
    baseProps: {
        ready () {
            this.$.baseProps = this.$this.querySelectorAll('ui-prop:not(.customProp)');
            this.$.baseProps.forEach((element) => {
                const key = element.getAttribute('key');
                const isEmpty = element.getAttribute('empty');
                const isInput = element.getAttribute('inputflag');
                const isHeader = element.getAttribute('slot') === 'header';
                element.addEventListener('change-dump', () => {
                    uiElements.baseProps.update.call(this);
                });
                if (isEmpty) {
                    if (isHeader) {
                        const checkbox = element.querySelector('ui-checkbox');
                        if (checkbox) {
                            checkbox.addEventListener('change', (event) => {
                                this.getObjectByKey(this.dump.value, key).value = event.target.value;
                                element.dispatch('change-dump');
                            });
                        }
                    }
                    if (isInput) {
                        const input = element.querySelector('ui-input');
                        if (input) {
                            input.addEventListener('change', (event) => {
                                this.getObjectByKey(this.dump.value, key).value = event.target.value;
                                element.dispatch('change-dump');
                            });
                        }
                    }
                }
            });
        },
        update () {
            this.$.baseProps.forEach((element) => {
                const key = element.getAttribute('key');
                const isEmpty = element.getAttribute('empty');
                let isShow = this.getObjectByKey(this.dump.value, key).visible;
                const isHeader = element.getAttribute('slot') === 'header';
                const isInput = element.getAttribute('inputflag');
                if (!isEmpty) {
                    const showflag = element.getAttribute('showflag');
                    if (showflag) {
                        if (typeof showflag === 'string') {
                            if (showflag.startsWith('checkEnumInSubset')) {
                                const params = showflag.split(',');
                                const enumValue = this.getObjectByKey(this.dump.value, params[1]);
                                const subset = params.slice(2);
                                isShow = isShow && this.checkEnumInSubset(enumValue, ...subset);
                            } else if (showflag.startsWith('!')) {
                                isShow = isShow && !this.getObjectByKey(this.dump.value, showflag.slice(1));
                            } else {
                                isShow = isShow && this.getObjectByKey(this.dump.value, showflag);
                            }
                        }
                    }
                    if (isShow) {
                        element.render(this.getObjectByKey(this.dump.value, key));
                    }
                    element.style = isShow ? '' : 'display: none;';
                } else {
                    const dump = this.getObjectByKey(this.dump.value, key);
                    const label = element.querySelector('ui-label');
                    if (label) {
                        const labelflag = element.getAttribute('labelflag');
                        if (labelflag) {
                            label.setAttribute('value', this.getName(this.getObjectByKey(this.dump.value, labelflag)));
                            label.setAttribute('tooltip', this.getTitle(this.getObjectByKey(this.dump.value, labelflag)));
                        }
                    }
                    if (isInput) {
                        const input = element.querySelector('ui-input');
                        input.setAttribute('value', dump.value);
                    }
                    if (isHeader) {
                        const checkbox = element.querySelector('ui-checkbox');
                        if (checkbox) {
                            checkbox.setAttribute('value', dump.value);
                        }
                    }

                    element.dump = dump;
                }
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
    emitFromSelect: '#emitFromSelect',
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
