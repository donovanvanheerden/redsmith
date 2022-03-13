const distinct = (value: string, index: number, self: string[]): boolean => self.indexOf(value) === index;

const distinctObjects =
  <T>(uniqueKey: (ob: T) => string) =>
  (ob: T, index: number, self: T[]): boolean => {
    const objectKey = uniqueKey(ob);

    const sIdx = self.findIndex((s) => uniqueKey(s) === objectKey);

    return sIdx === index;
  };

const order = (valueA: string, valueB: string): 1 | -1 | 0 => {
  if (valueA.trim() > valueB.trim()) return 1;
  if (valueB.trim() > valueA.trim()) return -1;

  return 0;
};

const orderByKey =
  <T>(key: keyof T, direction: 'asc' | 'desc' = 'asc') =>
  (ob1: T, ob2: T): 1 | -1 | 0 => {
    // console.log('orderBy: ', key, ', direction: ', direction, ob1[key], ob2[key]);

    if (!ob1[key]) return direction === 'asc' ? -1 : 1;
    if (!ob2[key]) return direction === 'asc' ? 1 : -1;

    if (ob1[key].toString().trim() > ob2[key].toString().trim()) return direction === 'asc' ? 1 : -1;
    if (ob2[key].toString().trim() > ob1[key].toString().trim()) return direction === 'asc' ? -1 : 1;
    return 0;
  };

export default {
  distinct,
  distinctObjects,
  order,
  orderByKey,
};
