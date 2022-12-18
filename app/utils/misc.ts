export function chunked<T>(array: T[], size: number): T[][] {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

export function uniqueBy<T>(list: T[], selector: (x: T) => any) {
  const s = new Set();
  const result: T[] = [];
  list.forEach((x) => {
    const key = selector(x);
    if (s.has(key)) return;
    result.push(x);
    s.add(key);
  });
  return result;
}
