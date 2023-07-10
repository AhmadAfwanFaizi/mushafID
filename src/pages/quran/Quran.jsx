import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

const Quran = () => {
  const { surahId = null } = useParams();
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSurah = async (surahId = null) => {
    setLoading(true);
    try {
      const url =
        surahId === null
          ? "https://api.quran.gading.dev/surah"
          : "https://api.quran.gading.dev/surah/" + surahId;

      const res = await axios.get(url);

      setSurah(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(surahId, surah, loading);
    getSurah(surahId);
  }, [surahId]);

  // return console.log(surahId, surah.length, loading);

  return (
    <>
      <div
        className="search py-4 fixed top-20 bg-blue-400 z-10 flex justify-around"
        style={{ width: "inherit" }}
      >
        <label className="relative block w-11/12">
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full text-slate-500 rounded-full"
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
              {loading
                ? "loading..."
                : surah.length !== 0 && surahId
                ? surah.verses.map((verse) => (
                    <tr key={verse.number.inSurah}>
                      <td>
                        <div className="media flex justify-between items-center h-10 bg-slate-100 rounded-full">
                          <div className="media-left">
                            <button className="btn btn-ghost">
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
                                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="media-right mr-2">
                            <button className="btn btn-ghost">
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
                                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                />
                              </svg>
                            </button>
                            <button className="btn btn-ghost">
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
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="ayah arabic flex justify-end items-center text-right text-lg py-5">
                          <div className="w-8 h-8 flex justify-center items-center border border-slate-600 rounded-full mr-2">
                            {verse.number.inSurah}
                          </div>
                          {verse.text.arab}
                        </div>
                        <div className="translate">{verse.translation.id}</div>
                      </td>
                    </tr>
                  ))
                : surah.map((data) => (
                    <tr key={data.number}>
                      <a href={`/quran/${data.number}`} className="contents">
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
                      </a>
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
