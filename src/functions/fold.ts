export function fold<T, V>(
  iterable: Iterable<T>,
  initialValue: V,
  folder: (v: V, t: T) => V,
): V {
  let result = initialValue;

  for (const value of iterable) {
    result = folder(result, value);
  }

  return result;
}
