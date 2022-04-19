import nc from 'next-connect';

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const { data: dataPerbandingan } = await axios.get(
    `${process.env.CMS_URL}/api/perbandingan-berpasangans`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    }
  );

  const listData = dataPerbandingan.data;

  let totalMatematika = 0;
  let totalFisika = 0;
  let totalBiologi = 0;
  let totalKimia = 0;

  for (let i = 0; i < listData.length; i++) {
    totalMatematika += listData[i].attributes.matematika;
    totalFisika += listData[i].attributes.fisika;
    totalBiologi += listData[i].attributes.biologi;
    totalKimia += listData[i].attributes.kimia;
  }

  const { data: result } = await axios.post(
    `${process.env.CMS_URL}/api/normalisasis`,
    {
      data: {
        biologi: 10,
        fisika: 14,
        kimia: 13,
        matematika: 11,
        indonesia: 2,
        inggris: 31,
        bobot: 32,
        hasikali_prioritas: 30,
        HK_PV: 1,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    }
  );

  const { data: dataSiswa } = await axios.get(
    `${process.env.CMS_URL}/api/nilai-siswas`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    }
  );

  const { data: resultNilaisiswa } = await axios.post(
    `${process.env.CMS_URL}/api/nilai-siswas`,
    {
      data: {
        name: 'daniel',
        biologi: 74,
        fisika: 84,
        kimia: 93,
        matematika: 71,
        indonesia: 82,
        inggris: 81,
        atribut: 'R6',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    }
  );

  let totalNilaiBiologi = 0;
  let totalNilaiFisika = 0;
  let hasilkali = [];

  const listData2 = dataSiswa.data;

  // for (let i = 0; i < listData2.length; i++) {
  //   const tempArray = [];
  //   tempArray.push(listData2[i].attributes.biologi);
  //   tempArray.push(listData2[i].attributes.fisika);
  //   hasilkali.push(tempArray);
  // }

  for (let i = 0; i < listData2.length; i++) {
    const tempArray = [];
    tempArray.push(listData2[i].attributes.biologi);
    tempArray.push(listData2[i].attributes.fisika);
    hasilkali.push(tempArray);
  }

  let a = Math.sqrt(81);

  console.log(a);

  return res.json({
    siswa: dataSiswa,
    perbandingan: dataPerbandingan,
  });
});

export default handler;
