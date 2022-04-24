import { matrix, multiply, transpose } from 'mathjs';
import { calculateTotal } from './ahp';
import { getPerbandingan } from '@lib/fetcher/server/perbandingan';
import { getKriteria } from '@lib/fetcher/server/kriteria';
import { addNormalized } from '@lib/fetcher/server/normalisasi';

export const normalize = async (prodiName: string) => {
  const { data: dataKriteria } = await getKriteria({
    sort: ['index'],
  });

  const { data } = await getPerbandingan({
    filters: {
      prodi: {
        name: {
          $eq: prodiName,
        },
      },
    },
    populate: '*',
  });

  const idProdi = data[0].attributes.prodi.data.id;

  const total = calculateTotal(data, dataKriteria);

  const rawPerbandigan = dataKriteria.map((element) => {
    const tempArray: Array<number> = [];

    data.forEach((item) => {
      Object.entries(item.attributes).forEach(([key]) => {
        if (key === element.attributes.name) {
          // @ts-ignore
          tempArray.push(item.attributes[key]);
        }
      });
    });

    return tempArray;
  });

  const multiplier: Array<number> = [];

  const partialResult = dataKriteria.map((element, index) => {
    const normalizedObject = {
      biologi: data[index].attributes.biologi / total.biologi,
      fisika: data[index].attributes.fisika / total.fisika,
      kimia: data[index].attributes.kimia / total.kimia,
      matematika: data[index].attributes.matematika / total.matematika,
      indonesia: data[index].attributes.indonesia / total.indonesia,
      inggris: data[index].attributes.inggris / total.inggris,
    };

    const resultList = Object.entries(normalizedObject).map(([key, value]) => {
      return value;
    });

    const bobot =
      resultList.reduce((acc, curr) => {
        return acc + curr;
      }) / resultList.length;

    multiplier.push(bobot);

    return {
      ...normalizedObject,
      kriteria: element.id,
      bobot,
    };
  });

  const transposedRawPerbandingan = transpose(rawPerbandigan);

  const resultPromise = partialResult.map((element, index) => {
    const firstMatrix = matrix(transposedRawPerbandingan[index]);
    const secondMatrix = matrix(multiplier);

    const result = multiply(firstMatrix, secondMatrix);

    return addNormalized({
      ...element,
      prodi: idProdi,
      hasilkali_prioritas: result as unknown as number,
      HK_PV: (result as unknown as number) / element.bobot,
    });
  });

  try {
    const result = await Promise.all(resultPromise);
    return result;
  } catch (error) {
    console.log(error);
    return `Error normalizing ${prodiName}`;
  }
};
