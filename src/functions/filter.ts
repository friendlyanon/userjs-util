export function* filter<T>(
  iterable: Iterable<T>,
  predicate: (this: any, t: T) => boolean,
  thisArg?: any,
): IterableIterator<T> {
  for (const value of iterable) {
    if (predicate.call(thisArg, value)) {
      yield value;
    }
  }
}
