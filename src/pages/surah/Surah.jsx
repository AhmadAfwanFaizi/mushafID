import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MediaAyah from "/src/components/MediaAyah.jsx";

const Surah = () => {
  const { surahId = null } = useParams();
  const [surah, setSurah] = useState([]);
  // const [playMedia, setPlayMedia] = useState(false);
  const getSurah = async (surahId = null) => {
    try {
      const url =
        surahId === null
          ? "https://api.quran.gading.dev/surah"
          : "https://api.quran.gading.dev/surah/" + surahId;

      const res = await axios.get(url);
      const data = res.data.data;
      setSurah(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSurah(surahId);
  }, [surahId]);

  return (
    <div className="surah min-h-screen px-4 mt-28">
      <div className="card card-last_read w-ful bg-base-100 shadow-xl">
        <div className="card-body items-center p-4">
          <div className="card-title">
            {surah.length != 0 && surah.name.transliteration.id}
          </div>
          <div className="text-md">
            {surah.length != 0 && surah.name.translation.id}
          </div>
          <p className="text-sm mt-2">
            {surah.length != 0 && surah.revelation.id} -{" "}
            {surah.length != 0 && surah.numberOfVerses}
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="table text-slate-600">
          <tbody>
            {surah.length === 0
              ? "Loading..."
              : surah.verses.map((verse) => (
                  <tr key={verse.number.inSurah}>
                    <td>
                      <MediaAyah />
                      <div className="ayah flex justify-end items-center text-right text-lg py-5">
                        <div className="w-8 h-8 flex justify-center items-center border border-slate-600 rounded-full mr-2">
                          {verse.number.inSurah}
                        </div>
                        <div className="arabic">{verse.text.arab}</div>
                      </div>
                      <div className="translate">{verse.translation.id}</div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Surah;
