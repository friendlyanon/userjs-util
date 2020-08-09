import { fold } from "./fold";

export function reduce<T>(
  iterable: Iterable<T>,
  reducer: (a: T, b: T) => T,
): T | undefined {
  const it = <IterableIterator<T>> iterable[Symbol.iterator]();
  const { value, done } = it.next();

  return done ? void 0 : fold(it, value, reducer);
}
