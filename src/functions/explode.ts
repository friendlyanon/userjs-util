/**
 * Explode implementation. The inputs to this function are not validated, use
 * {@link explode} for inputs that might not meet the requirements.
 *
 * @param delimiter Non-empty string
 * @param string
 * @param limit Integer in the range of [2 - 4294967295]
 */
export function explodeUnsafe(
  delimiter: string,
  string: string,
  limit: number,
): string[] {
  let index = string.indexOf(delimiter);
  if (index === -1) {
    return [string];
  }

  const { length } = delimiter;
  if (limit === 2) {
    return [string.slice(0, index), string.slice(index + length)];
  }

  const result: string[] = [];
  let previous = 0;
  do {
    const slice = string.slice(previous, index);
    const count = result.push(slice);
    previous += slice.length + length;

    if (count + 1 === limit) {
      break;
    }

    index = string.indexOf(delimiter, previous);
  } while (index !== -1);

  result.push(string.slice(previous));
  return result;
}

const validateLimit = (limit: number): [boolean, number] =>
  limit === 0 ? [false, 1] : [limit < 0, Math.abs(Math.trunc(limit))];

const maxLimit = -1 >>> 0;

/**
 * This function validates its inputs and delegates to {@link explodeUnsafe},
 * then if `limit` was a negative number, removes that many slices from the end
 * of the result.
 *
 * @see https://www.php.net/manual/en/function.explode.php
 *
 * @param delimiter
 * @param string
 * @param limit
 *
 * @throws {TypeError} if limit is NaN
 * @throws {Error} if delimiter is an empty string
 * @throws {RangeError} if the validated limit is bigger than the maximum array
 * capacity
 */
export function explode(
  delimiter: string,
  string: string,
  limit: number = maxLimit,
): string[] {
  if (isNaN(limit)) {
    throw new TypeError("limit is not a number");
  }

  if (!delimiter) {
    throw new Error("Empty delimiter");
  }

  const [isNegative, max] = validateLimit(limit);
  if (max > maxLimit) {
    throw new RangeError(
      `limit (${max}) is out of range (-${maxLimit} - ${maxLimit})`,
    );
  }

  const slices = !string || limit === 1
    ? [string]
    : explodeUnsafe(delimiter, string, max);
  if (isNegative) {
    if (max >= slices.length) {
      return [];
    }

    slices.splice(slices.length - max);
  }

  return slices;
}
