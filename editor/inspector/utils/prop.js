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
