import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Surah = () => {
  const { surahId = null } = useParams();
  const [surah, setSurah] = useState([]);
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

  //   return console.log({ surahId }, surah);
  return (
    <div className="surah min-h-screen px-4 mt-40">
      <div className="overflow-x-auto">
        <table className="table text-slate-600">
          <tbody>
            {surah.length === 0
              ? "Loading..."
              : surah.verses.map((verse) => (
                  <tr key={verse.number.inSurah}>
                    <td>
                      {/* button play */}
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
                          {/* button share */}
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
                          {/* button save */}
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
