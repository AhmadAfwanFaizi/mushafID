import { useContext, useState, useEffect } from "react";
import { RootContext } from "/src/context/Root";
import { useParams, useLocation } from "react-router-dom";
import useQuranApi from "/src/hooks/useQuranApi.jsx";
import Ayah from "/src/components/Ayah.jsx";

const Surah = () => {
  const context = useContext(RootContext);
  const { surahId = null } = useParams();
  const surah = useQuranApi(surahId);
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (hash) {
      console.log("masuk hash");
      window.location.href = `${hash}`;
    }
  }, [surah]);

  const handleLastRead = (namaSurah, surahId, ayah) => {
    context.handleLastRead(namaSurah, surahId, ayah);
  };

  return (
    <div className="surah min-h-screen px-4 mt-28">
      <div className="card card-last_read w-ful bg-base-100 shadow-xl">
        <div className="card-body items-center p-4 text-slate-100">
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
        <table className="table">
          <tbody>
            {surah.length === 0
              ? "Loading..."
              : surah.verses.map((verse) => (
                  <tr
                    key={verse.number.inSurah}
                    id={verse.number.inSurah}
                    onTouchStart={() =>
                      handleLastRead(
                        surah.name.transliteration.id,
                        surahId,
                        verse.number.inSurah
                      )
                    }
                    onClick={() =>
                      handleLastRead(
                        surah.name.transliteration.id,
                        surahId,
                        verse.number.inSurah
                      )
                    }
                  >
                    <td>
                      <Ayah
                        data={verse}
                        surahId={surahId}
                        bookmark={context.checkBookmark(
                          `${surahId}:${verse.number.inSurah}`
                        )}
                      />
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
