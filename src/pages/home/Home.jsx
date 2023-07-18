import { useContext } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "/src/context/Root";
import "./style.css";
const Home = () => {
  const context = useContext(RootContext);
  return (
    <div className="px-6 py-2 grid grid-cols-2 gap-6 mt-28">
      <div className="col-span-2">
        <div className="card card-last_read w-ful bg-base-100 shadow-xl">
          <div className="card-body text-slate-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h2 className="card-title">Terakhir Dibaca</h2>
                <p>
                  {context.lastRead.namaSurah} : {context.lastRead.ayah}
                </p>
                <div className="card-actions justify-end"></div>
                <Link
                  to={`/surah/${context.lastRead.surahId}#${context.lastRead.ayah}`}
                  className="link link-hover flex"
                >
                  Mulai
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="col-span-1 icon-menu_header icon-last_read h-24"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="card card-quran w-ful bg-base-100 shadow-xl h-80 bg-blue-green">
          <div className="card-body text-slate-100 justify-between">
            <div className="icon-menu icon-quran h-24"></div>
            <div>
              <h2 className="card-title">Quran</h2>
              <div className="card-actions justify-end"></div>
              <Link to="/quran" className="link link-hover flex">
                Mulai
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="card card-tajwid w-ful bg-base-100 shadow-xl h-60 bg-lavender">
          <div className="card-body text-slate-100 justify-between">
            <div className="icon-menu icon-tajwid h-24"></div>
            <div>
              <h2 className="card-title">Tajwid</h2>
              <div className="card-actions justify-end"></div>
              <button
                className="link link-hover flex"
                onClick={() =>
                  context.showModal("Hello", "Fitur masih belum tersedia...")
                }
              >
                Mulai
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="card card-memorize w-ful bg-base-100 shadow-xl h-60 bg-dull-pink">
          <div className="card-body text-slate-100 justify-between">
            <div className="icon-menu icon-memorize h-24"></div>
            <div>
              <h2 className="card-title">Hafalan</h2>
              <div className="card-actions justify-end"></div>
              <a
                href="#"
                className="link link-hover flex"
                onClick={() =>
                  context.showModal("Hello", "Fitur masih belum tersedia...")
                }
              >
                Mulai
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="card card-bookmark w-ful bg-base-100 shadow-xl h-80 bg-moonstone-blue">
          <div className="card-body text-slate-100 justify-between">
            <div className="icon-menu icon-bookmark h-24"></div>
            <div>
              <h2 className="card-title">Penanda</h2>
              <div className="card-actions justify-end"></div>
              <Link to="/bookmark" className="link link-hover flex">
                Mulai
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
