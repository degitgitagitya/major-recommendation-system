import { Kriteria } from '@lib/fetcher/server/kriteria';
import { Perbandingan } from '@lib/fetcher/server/perbandingan';

export const calculateTotal = (
  data: Perbandingan[],
  dataKriteria: Kriteria[]
) => {
  const result = dataKriteria.map((element) => {
    const key = element.attributes.name;

    const total = data.reduce(
      // @ts-ignore
      (acc, curr) => acc + curr.attributes[key],
      0
    );

    return {
      [key]: total,
    };
  });

  const objectResult: Record<string, number> = {};

  result.forEach((element) => {
    objectResult[Object.keys(element)[0]] = Object.values(element)[0];
  });

  return objectResult;
};
