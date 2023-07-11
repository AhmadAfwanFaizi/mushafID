import { useEffect, useState } from "react";
import axios from "axios";

const useQuranApi = (surahId) => {
  const [data, setData] = useState([]);
  const getSurah = async (surahId = null) => {
    try {
      const url =
        surahId === null
          ? "https://api.quran.gading.dev/surah"
          : "https://api.quran.gading.dev/surah/" + surahId;

      const res = await axios.get(url);
      const data = res.data.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSurah(surahId);
  }, [surahId]);

  return data;
};

export default useQuranApi;
