import { getKriteria } from '@lib/fetcher/kriteria';
import { getNilai, NilaiSiswa } from '@lib/fetcher/nilai';
import { getNormalized } from '@lib/fetcher/normalisasi';

export const calculateTopsisNormalize = async () => {
  const { data: nilaiSiswa } = await getNilai({
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  });

  const { data: dataKriteria } = await getKriteria({
    sort: ['index'],
  });

  const kiretiaWithValue = dataKriteria.map((kriteria) => [
    kriteria.attributes.name,
    0,
  ]);

  const euclide = Object.fromEntries(kiretiaWithValue);

  nilaiSiswa.forEach((nilai) => {
    const {
      attributes: { biologi, fisika, kimia, matematika, indonesia, inggris },
    } = nilai;

    euclide.biologi += biologi * biologi;
    euclide.fisika += fisika * fisika;
    euclide.kimia += kimia * kimia;
    euclide.matematika += matematika * matematika;
    euclide.indonesia += indonesia * indonesia;
    euclide.inggris += inggris * inggris;
  });

  Object.entries(euclide).forEach(([key, value]) => {
    euclide[key] = Math.sqrt(value as number);
  });

  const normalizedTopsis = nilaiSiswa.map((nilai) => {
    const {
      attributes: { biologi, fisika, kimia, matematika, indonesia, inggris },
    } = nilai;

    return {
      ...nilai,
      attributes: {
        ...nilai.attributes,
        biologi: biologi / euclide.biologi,
        fisika: fisika / euclide.fisika,
        kimia: kimia / euclide.kimia,
        matematika: matematika / euclide.matematika,
        indonesia: indonesia / euclide.indonesia,
        inggris: inggris / euclide.inggris,
      },
    };
  });

  const normalizedWeightWithMinMax = {
    PBiologi: await normalizedTopsisTimeWeight('PBiologi', normalizedTopsis),
    // PIlmuKomputer: await normalizedTopsisTimeWeight(
    //   'PIlmuKomputer',
    //   normalizedTopsis
    // ),
    // PFisika: await normalizedTopsisTimeWeight('PFisika', normalizedTopsis),
    // PKimia: await normalizedTopsisTimeWeight('PKimia', normalizedTopsis),
    // PMatematika: await normalizedTopsisTimeWeight(
    //   'PMatematika',
    //   normalizedTopsis
    // ),
  };
};

export const normalizedTopsisTimeWeight = async (
  prodi: string,
  normalizedTopsis: NilaiSiswa[]
) => {
  const { data: normalizedWeight } = await getNormalized({
    filters: {
      prodi: {
        name: {
          $eq: prodi,
        },
      },
    },
    populate: '*',
  });

  const weight = Object.fromEntries(
    normalizedWeight.map((item) => {
      if (typeof item.attributes.kriteria === 'number') {
        return [item.attributes.kriteria, item.attributes.bobot];
      } else {
        if (item.attributes.kriteria) {
          return [
            item.attributes.kriteria.data.attributes.name,
            item.attributes.bobot,
          ];
        } else {
          return ['', item.attributes.bobot];
        }
      }
    })
  );

  const normalizedWithWeight = normalizedTopsis.map((item) => {
    const { biologi, fisika, kimia, matematika, indonesia, inggris } = weight;

    return {
      ...item,
      attributes: {
        ...item.attributes,
        biologi: item.attributes.biologi * biologi,
        fisika: item.attributes.fisika * fisika,
        kimia: item.attributes.kimia * kimia,
        matematika: item.attributes.matematika * matematika,
        indonesia: item.attributes.indonesia * indonesia,
        inggris: item.attributes.inggris * inggris,
      },
    };
  });

  const minMax = findMinMax(normalizedWithWeight);
  const min = Object.entries(minMax.min).map(([key, value]) => value);

  const s = normalizedWithWeight.map((item) => {
    console.log(prodi);
    console.log(item.attributes.atribut);
    const { biologi, fisika, kimia, matematika, indonesia, inggris } =
      item.attributes;

    const array = [biologi, fisika, kimia, matematika, indonesia, inggris];

    console.log(min);

    console.log(array);

    const sMin = vectorDistance(array, min);

    console.log(sMin);

    return sMin;
  });

  return { normalizedWithWeight, minMax };
};

const findMinMax = (data: NilaiSiswa[]) => {
  const dataForCalculation = data.map((item) => {
    const {
      attributes: { biologi, fisika, kimia, matematika, indonesia, inggris },
    } = item;

    return {
      biologi,
      fisika,
      kimia,
      matematika,
      indonesia,
      inggris,
    };
  });

  const min = dataForCalculation.reduce((acc, curr) => {
    return {
      biologi: Math.min(acc.biologi, curr.biologi),
      fisika: Math.min(acc.fisika, curr.fisika),
      kimia: Math.min(acc.kimia, curr.kimia),
      matematika: Math.min(acc.matematika, curr.matematika),
      indonesia: Math.min(acc.indonesia, curr.indonesia),
      inggris: Math.min(acc.inggris, curr.inggris),
    };
  });

  const max = dataForCalculation.reduce((acc, curr) => {
    return {
      biologi: Math.max(acc.biologi, curr.biologi),
      fisika: Math.max(acc.fisika, curr.fisika),
      kimia: Math.max(acc.kimia, curr.kimia),
      matematika: Math.max(acc.matematika, curr.matematika),
      indonesia: Math.max(acc.indonesia, curr.indonesia),
      inggris: Math.max(acc.inggris, curr.inggris),
    };
  });

  return {
    min,
    max,
  };
};

const vectorDistance = (x: Array<number>, y: Array<number>) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));
