import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootProvider } from "/src/context/Root";

import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Quran from "./pages/quran/Quran";
import Surah from "./pages/surah/Surah";
import Bookmark from "./pages/bookmark/Bookmark";
import Modal from "./components/Modal";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RootProvider>
        <div className="mx-auto flex justify-center">
          <div className="app w-screen min-h-screen lg:w-1/2">
            <Modal />
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/surah">
                <Route path=":surahId" element={<Surah />} />
                {/* <Route path=":surahId/:ayah" element={<Surah />} /> */}
              </Route>
              <Route path="/bookmark" element={<Bookmark />} />
            </Routes>
          </div>
        </div>
      </RootProvider>
    </BrowserRouter>
  );
}

export default App;
