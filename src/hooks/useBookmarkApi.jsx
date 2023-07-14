import { useState, useEffect } from "react";
import axios from "axios";

const useBookmarkApi = (surahId, ayahNumber) => {
  const [data, setData] = useState([]);
  const getSurah = async (surahId = null) => {
    try {
      const url = `https://api.quran.gading.dev/surah/${surahId}/${ayahNumber}`;

      const res = await axios.get(url);
      const data = res.data.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSurah();
  }, []);

  return data;
};

export default useBookmarkApi;
