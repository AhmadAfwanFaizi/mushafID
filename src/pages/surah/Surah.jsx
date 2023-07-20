import { useContext, useState, useEffect, useRef } from "react";
import { RootContext } from "/src/context/Root";
import { useParams, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useQuranApi from "/src/hooks/useQuranApi.jsx";
import Ayah from "/src/components/Ayah.jsx";
import Loading from "/src/components/Loading";

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
      window.location.href = `${hash}`;
    }
  }, [surah]);

  const searchAyahInput = useRef();
  const handleSearchAyah = (e) => {
    e.preventDefault();
    const search = searchAyahInput.current.value;
    const alert = document.querySelector(".alert-search-ayah");
    const totalAyah = surah.numberOfVerses;

    if (search.length > 0) {
      if (parseInt(search) < 1 || parseInt(search) > totalAyah) {
        alert.classList.remove("hidden");
      } else {
        alert.classList.add("hidden");
        window.location.href = `#${search}`;
        window.modalSearchAyah.close();
      }
    }
  };

  const handleResetSearchAyah = () => {
    searchAyahInput.current.value = "";
  };

  return (
    <div className="surah min-h-screen px-4 mt-28">
      <dialog id="modalSearchAyah" className="modal">
        <form method="dialog" className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleResetSearchAyah}
          >
            ✕
          </button>
          <div className="alert-search-ayah hidden">
            <div className="alert mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Ayat tidak ditemukan</span>
            </div>
          </div>

          <label htmlFor="search" className="relative block py-4">
            <input
              ref={searchAyahInput}
              id="searchAyah"
              type="number"
              className="input input-bordered w-full rounded-full"
              placeholder="Cari ayat"
              autoComplete="off"
            />
            <button
              className="absolute inset-y-4 right-1 flex items-center  btn btn-circle"
              onClick={handleSearchAyah}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </label>
        </form>
      </dialog>

      {surah.length === 0 ? (
        <Loading height="6rem" style={{ marginBottom: "1rem" }} />
      ) : (
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
      )}

      <div className="overflow-x-auto mt-2">
        {surah.length === 0 ? (
          <Loading count={7} height="3rem" style={{ marginBottom: "1rem" }} />
        ) : (
          <table className="table">
            <tbody>
              {surah.verses.map((verse) => (
                <tr key={verse.number.inSurah} id={verse.number.inSurah}>
                  <td>
                    <Ayah
                      surahName={surah.name}
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
        )}
      </div>
    </div>
  );
};

export default Surah;
