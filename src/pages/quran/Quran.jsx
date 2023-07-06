import { useEffect, useState } from "react";
import axios from "axios";

const Quran = () => {
  const [surah, setSurah] = useState([]);

  useEffect(() => {
    const getSurah = async () => {
      try {
        await axios.get("https://api.quran.gading.dev/surah").then((res) => {
          setSurah(res.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getSurah();
  }, []);

  console.log("🚀 ~ file: index.jsx:5 ~ surah:", surah);
  return (
    <div className="min-h-screen px-4">
      <div className="search pb-4">
        <label className="relative block">
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
      <div className="surah">
        <div className="overflow-x-auto">
          <table className="table text-slate-600">
            <tbody>
              {surah.map((data) => (
                <tr key={data.number}>
                  <th className="w-[100px]">
                    <div
                      className="w-12 h-12 flex justify-center items-center"
                      style={{
                        backgroundImage: `url('/src/assets/icons/ayah.png')`,
                        backgroundSize: "cover",
                      }}
                    >
                      {data.number}
                    </div>
                  </th>
                  <td className="text-lg flex flex-col">
                    {data.name.transliteration.id}
                    <span className="text-sm text-slate-500">
                      {data.revelation.id} - {data.numberOfVerses}
                    </span>
                  </td>
                  <td className="text-lg text-right arabic">
                    {data.name.short}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Quran;
