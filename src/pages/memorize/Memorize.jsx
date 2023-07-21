import { useEffect, useState, useContext } from "react";
import { RootContext } from "/src/context/Root";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useQuranApi from "/src/hooks/useQuranApi";
import Loading from "/src/components/Loading";

const Memorize = () => {
  const quranApi = useQuranApi(null);
  const context = useContext(RootContext);
  const memorizes = context.memorizes;
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

  const handlePercentage = (numberSurah, totalAyah) => {
    let memorizeCount = 0;
    memorizes?.map((memorize) => {
      const memorizeSplit = memorize.split(":");
      if (numberSurah == memorizeSplit[0]) {
        memorizeCount += 1;
      }
    });
    const value = (parseInt(memorizeCount) / parseInt(totalAyah)) * 100;
    return value.toFixed(0);
  };

  // console.log({ context });
  return (
    <>
      <div
        className="search py-4 fixed top-16 bg-romance z-10 flex justify-around shadow-md rounded-xl"
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
            <MagnifyingGlassIcon
              className="h-6 w-6"
              style={{ filter: "opacity(0.3)" }}
            />
          </span>
        </label>
      </div>

      <div className="surah min-h-screen px-4 mt-40">
        <div className="overflow-x-auto">
          {surah.length === 0 ? (
            <div className="mt-4">
              <Loading
                count={7}
                height="3rem"
                style={{ marginBottom: "1rem" }}
              />
            </div>
          ) : (
            <table className="table">
              <tbody>
                {surah.map((data) => {
                  const percentage = handlePercentage(
                    data.number,
                    data.numberOfVerses
                  );

                  return (
                    <tr key={data.number}>
                      <Link
                        to={`/memorize/surah?surahId=${data.number}&feature=memorize`}
                        className="contents"
                      >
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
                        <td className="text-right ">
                          <div className="text-xl  arabic">
                            {data.name.short}
                          </div>
                          <div className="text-xs">
                            <span>{percentage}%</span>
                            <progress
                              className="progress progress-success w-16 ml-2"
                              value={percentage}
                              max="100"
                            ></progress>
                          </div>
                        </td>
                      </Link>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Memorize;
