import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useQuranApi from "/src/hooks/useQuranApi";
import Loading from "/src/components/Loading";

const Quran = () => {
  const quranApi = useQuranApi(null);
  const [dataSurah, setDataSurah] = useState([]);
  const [surah, setSurah] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDataSurah(quranApi);
    setSurah(quranApi);
  }, [quranApi]);

  const handleSearch = (e) => {
    const search = e.target.value;
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

  return (
    <>
      <div
        className="search py-4 fixed top-20 bg-romance z-10 flex justify-around shadow-md rounded-xl"
        style={{ width: "inherit" }}
      >
        <label htmlFor="search" className="relative block w-11/12">
          <input
            id="search"
            type="text"
            className="input input-bordered w-full rounded-full"
            placeholder="Surah"
            onChange={handleSearch}
          />
          <span className="absolute inset-y-0 right-3 flex items-center pl-2">
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
          <table className="table">
            <tbody>
              {surah.length === 0 ? (
                <Loading
                  count={7}
                  height="3rem"
                  style={{ marginBottom: "1rem" }}
                />
              ) : (
                surah.map((data) => (
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
                      <td className="text-lg flex flex-col text-slate-800">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Quran;
