export function emplace<K, V>(map: Map<K, V>, key: K, supplier: () => V): V {
  const result = map.get(key);
  if (result != null) {
    return result;
  }

  const group: V = supplier();
  map.set(key, group);
  return group;
}
