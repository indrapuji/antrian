/* eslint-disable import/prefer-default-export */

/**
 * @param integer v: value to format
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * example: formatMoney(1000000, 0, 3, '.', ',') will return 1.000.000
 */
export const formatMoney = (v = 0, n = 0, x = 3, s = '.', c = ',') => {
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\D' : '$'})`;
  // eslint-disable-next-line no-bitwise
  const num = v.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'),
    `$&${s || ','}`
  );
};
