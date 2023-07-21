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
    if (pathParam.length === 2) {
      if (pathParam[1] === "") {
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
      } else {
        return (
          <Link to="/" className="btn btn-ghost">
            <HomeIcon
              className="h-7 w-7"
              title="Halaman Utama"
              strokeWidth="2"
            />
          </Link>
        );
      }
    } else if (path.length === 3) {
      return (
        <Link to={`/${path[1]}`} className="btn btn-ghost">
          <ChevronLeftIcon
            className="h-7 w-7"
            title="Kembali"
            strokeWidth="2"
          />
        </Link>
      );
    }
  };

  const navRight = (pathParam) => {
    if (pathParam.length === 3) {
      return (
        <button
          className="btn btn-ghost"
          title="Cari"
          onClick={() => window.modalSearchAyah.showModal()}
        >
          <MagnifyingGlassIcon className="h-7 w-7" strokeWidth="2" />
        </button>
      );
    }
  };

  return (
    <div
      className="fixed bg-romance top-0 z-10 flex justify-between py-4 text-2xl font-semibold"
      style={{ width: "inherit" }}
    >
      {/* left */}
      <div className="left w-16">{navLeft(path)}</div>

      {/* center */}
      <div className="center m-auto">
        <h1>MushafID</h1>
      </div>

      {/* right */}
      <div className="right w-16">{navRight(path)}</div>
    </div>
  );
};

export default Navbar;
