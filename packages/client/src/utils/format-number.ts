/**
 * A utility function to format number and return a string with desired styles.
 * This function uses JavaScript's inbuilt Object Intl.NumberFormat to format the number.
 * For more details, please refer to the following link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 *
 * @param {number} number - The number to be formatted.
 * @param {string} [style] - The style to be applied to the number.
 * @returns string with applied style. Example: "2,386,867"
 */
function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    ...options,
  }).format(value)
}

export default formatNumber
