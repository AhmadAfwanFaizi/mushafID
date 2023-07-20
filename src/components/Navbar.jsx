import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RootContext } from "/src/context/Root";
import {
  Bars3Icon,
  HomeIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const context = useContext(RootContext);

  const navLeft = (pathParam) => {
    switch (pathParam) {
      case "":
        return (
          <Link
            to="/"
            className="btn btn-ghost"
            onClick={() =>
              context.showModal("Hello", "Fitur masih belum tersedia...")
            }
          >
            <Bars3Icon
              className="h-7 w-7 font-semibold"
              title="Pilihan"
              strokeWidth="2"
            />
          </Link>
        );
        break;

      case "quran":
        return (
          <Link to="/" className="btn btn-ghost">
            <HomeIcon
              className="h-7 w-7"
              title="Halaman Utama"
              strokeWidth="2"
            />
          </Link>
        );
        break;
      case "surah":
        return (
          <Link to="/quran" className="btn btn-ghost">
            <ChevronLeftIcon
              className="h-7 w-7"
              title="Kembali"
              strokeWidth="2"
            />
          </Link>
        );
        break;
      case "bookmark":
        return (
          <Link to="/" className="btn btn-ghost">
            <HomeIcon
              className="h-7 w-7"
              title="Halaman Utama"
              strokeWidth="2"
            />
          </Link>
        );
        break;
      default:
        return "";
        break;
    }
  };

  const navRight = (pathParam) => {
    switch (pathParam) {
      case "surah":
        return (
          <button
            className="btn btn-ghost"
            title="Cari"
            onClick={() => window.modalSearchAyah.showModal()}
          >
            <MagnifyingGlassIcon className="h-7 w-7" strokeWidth="2" />
          </button>
        );
        break;

      case "":
        return "";
        break;
    }
  };

  return (
    <div
      className="fixed bg-romance top-0 z-10 flex justify-between py-4 text-2xl font-semibold"
      style={{ width: "inherit" }}
    >
      {/* left */}
      <div className="left w-16">{navLeft(path[1])}</div>

      {/* center */}
      <div className="center m-auto">
        <h1>MushafID</h1>
      </div>

      {/* right */}
      <div className="right w-16">{navRight(path[1])}</div>
    </div>
  );
};

export default Navbar;
