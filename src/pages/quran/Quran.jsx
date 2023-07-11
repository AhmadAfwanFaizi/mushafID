import { useEffect, useState, useContext } from "react";
import { RootContext } from "/src/context/Root";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

const Quran = () => {
  const context = useContext(RootContext);

  const { surahId = null } = useParams();
  const [dataSurah, setDataSurah] = useState([]);
  const [surah, setSurah] = useState([]);
  const getSurah = async (surahId = null) => {
    try {
      const url =
        surahId === null
          ? "https://api.quran.gading.dev/surah"
          : "https://api.quran.gading.dev/surah/" + surahId;

      const res = await axios.get(url);
      const data = res.data.data;
      setDataSurah(data);
      setSurah(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSurah(surahId);
  }, [surahId]);

  const handleSearch = (e) => {
    const search = e.target.value;
    console.log({ search }, search.length);
    if (search.length > 0) {
      const surah = dataSurah.filter((data) => {
        return data.name.transliteration.id
          .toLowerCase()
          .includes(search.toLowerCase());
      });

      setSurah(surah);
    } else {
      setSurah(dataSurah);
    }
  };

  // console.log(surahId, surah.length, loading);

  return (
    <>
      <div
        className="search py-4 fixed top-20 bg-blue-400 z-10 flex justify-around"
        style={{ width: "inherit" }}
      >
        <label htmlFor="search" className="relative block w-11/12">
          <input
            id="search"
            type="text"
            placeholder=""
            className="input input-bordered w-full text-slate-500 rounded-full"
            onChange={handleSearch}
          />
          <span className="absolute inset-y-0 right-3 flex items-center pl-2 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </label>
      </div>

      <div className="surah min-h-screen px-4 mt-40">
        <div className="overflow-x-auto">
          <table className="table text-slate-600">
            <tbody>
              {surah.length === 0
                ? "loading..."
                : surah.map((data) => (
                    <tr key={data.number}>
                      <Link to={`/surah/${data.number}`} className="contents">
                        <td className="w-[100px]">
                          <div
                            className="w-12 h-12 flex justify-center items-center"
                            style={{
                              backgroundImage: `url('/src/assets/svg/ayah.svg')`,
                              backgroundSize: "cover",
                            }}
                          >
                            {data.number}
                          </div>
                        </td>
                        <td className="text-lg flex flex-col">
                          {data.name.transliteration.id}
                          <span className="text-sm text-slate-500">
                            {data.revelation.id} - {data.numberOfVerses}
                          </span>
                        </td>
                        <td className="text-lg text-right arabic">
                          {data.name.short}
                        </td>
                      </Link>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Quran;
