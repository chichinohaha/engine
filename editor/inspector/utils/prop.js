/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Returns the ordered PropMap
 * @param {*} obj
 * @returns []
 */
exports.shortProp = function (obj) {
    const orderList = [];
    const normalList = [];

    Object.keys(obj).forEach((key) => {
        const item = obj[key];
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
