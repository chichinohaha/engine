/* eslint-disable @typescript-eslint/no-unsafe-return */
/*
 * Returns the ordered PropMap
 * @param {*} value of dump
 * @returns {key:string dump:object}[]
 */
exports.sortProp = function (propMap) {
    const orderList = [];
    const normalList = [];

    Object.keys(propMap).forEach((key) => {
        const item = propMap[key];
        if ('displayOrder' in item) {
            orderList.push({
                key,
                dump: item,
            });
        } else {
            normalList.push({
                key,
                dump: item,
            });
        }
    });

    orderList.sort((a, b) => a.dump.displayOrder - b.dump.displayOrder);

    return orderList.concat(normalList);
};

/**
 *
 * This function can filter the contents of the dump and is mainly used to get the user's dump data
 * @param {string[]} excludeList
 * @param {object} dump
 * @param {(element,prop)=>void} onElementCreated
 */
exports.getCustomPropElements = function (excludeList, dump, onElementCreated) {
    const customPropElements = [];
    const sortedProp = exports.sortProp(dump.value);
    sortedProp.forEach((prop) => {
        if (!excludeList.includes(prop.key)) {
            const node = document.createElement('ui-prop');
            node.setAttribute('type', 'dump');
            if (typeof onElementCreated === 'function') {
                onElementCreated(node, prop);
            }
            customPropElements.push(node);
        }
    });
    return customPropElements;
};

/**
 * 工具函数：循环设置资源数据中的 readonly
 */
exports.loopSetAssetDumpDataReadonly = function (dump) {
    if (typeof dump !== 'object') {
        return;
    }

    if (dump.readonly === undefined) {
        return;
    }

    dump.readonly = true;

    if (dump.isArray) {
        for (let i = 0; i < dump.value.length; i++) {
            exports.loopSetAssetDumpDataReadonly(dump.value[i]);
        }
        return;
    }

    for (const key in dump.value) {
        exports.loopSetAssetDumpDataReadonly(dump.value[key]);
    }
};

/**
 * 工具函数：设置不可用
 * @param {object} data  dump | function
 * @param element
 */
exports.setDisabled = function (data, element) {
    let disabled = data;

    if (typeof data === 'function') {
        disabled = data();
    }

    if (disabled === true) {
        element.setAttribute('disabled', 'true');
    } else {
        element.removeAttribute('disabled');
    }
};

/**
 * 工具函数：设置只读状态
 * @param {object} data  dump | function
 * @param element
 */
exports.setReadonly = function (data, element) {
    let readonly = data;

    if (typeof data === 'function') {
        readonly = data();
    }

    if (readonly === true) {
        element.setAttribute('readonly', 'true');
    } else {
        element.removeAttribute('readonly');
    }

    if (element.render) {
        element.dump.readonly = readonly;
        element.render();
    }
};

/**
 * 工具函数：设置显示状态
 * @param {object} data  dump | function
 * @param element
 */
exports.setHidden = function (data, element) {
    let hidden = data;

    if (typeof data === 'function') {
        hidden = data();
    }

    if (hidden === true) {
        element.setAttribute('hidden', '');
    } else {
        element.removeAttribute('hidden');
    }
};

exports.updatePropByDump = function (panel, dump, Elements) {
    const list = [];

    Object.keys(dump.value).forEach((key) => {
        const dumpdata = dump.value[key];

        dumpdata.displayOrder = dumpdata.displayOrder === undefined ? 0 : Number(dumpdata.displayOrder);
        dumpdata.displayOrder += 100;

        const element = Elements[key];
        if (element && element.displayOrder !== undefined) {
            dumpdata.displayOrder = element.displayOrder;
        }

        list.push({
            key,
            dumpdata,
        });
    });

    list.sort((a, b) => a.dumpdata.displayOrder - b.dumpdata.displayOrder);

    list.forEach((item) => {
        const { key, dumpdata } = item;
        const element = Elements[key];

        if (!panel.$[key]) {
            // 元素不存在且数据告知不需要显示，终止渲染
            if (!dumpdata.visible) {
                return;
            }

            panel.$[key] = document.createElement('ui-prop');
            panel.$[key].setAttribute('type', 'dump');
            panel.$[key].render(dumpdata);

            panel.$.container.appendChild(panel.$[key]);

            if (element && element.ready) {
                element.ready.call(panel, panel.$[key]);
            }
        } else {
            // 元素存在，但此时数据告知不需要显示
            if (!dumpdata.visible) {
                // 已挂载的需要撤销
                if (panel.$[key].parentNode === panel.$.container) {
                    panel.$[key].remove();

                    if (element && element.remove) {
                        element.remove.call(panel, panel.$[key]);
                    }
                }

                // 终止
                return;
            }

            panel.$[key].render(dumpdata);

            if (element && element.update) {
                element.update.call(panel, panel.$[key]);
            }
        }
    });
};
