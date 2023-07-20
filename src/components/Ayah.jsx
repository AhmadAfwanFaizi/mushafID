import { useContext, useState, useEffect } from "react";
import { RootContext } from "/src/context/Root";

import {
  PlayIcon,
  PauseIcon,
  MapPinIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  MapPinIcon as MapPinIconSolid,
} from "@heroicons/react/24/solid";

const Ayah = ({ surahName, data, surah = false, surahId, bookmark }) => {
  const context = useContext(RootContext);

  // ? kenapa menggunakan context untuk menyimpan data sementara
  // : karena jika menggunakan state, pada tiap komponen data di loop berdasarkan surah, ketika tombil bookmark di klik, react mengidentifikasi bahwa itu state baru pada tiap component dengan nama yang sama

  const [playAudio, setPlayAudio] = useState(false);
  const [activeAudio, setActiveAudio] = useState({});

  const handlePlayAudio = (numberSurah) => {
    const audioStatus = !playAudio;
    setPlayAudio(audioStatus);
    if (audioStatus) {
      const audio = document.getElementById("audio-" + numberSurah);
      audio.play();
      setActiveAudio(audio);
    } else {
      activeAudio.pause();
    }
  };
  const handleBookmark = (param) => {
    context.handleBookmark(param);
  };

  const handleLastRead = (namaSurah, surahId, ayah) => {
    context.handleLastRead(namaSurah, surahId, ayah);
  };

  return (
    <>
      <div className="media flex justify-between items-center h-10 bg-slate-100 rounded-full">
        <div className="media-left flex items-center content-around pl-2">
          <div className="bg-topaz text-slate-100 w-6 h-6 rounded-full flex justify-center items-center">
            {data.number.inSurah}
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => handlePlayAudio(data.number.inSurah)}
          >
            {playAudio ? (
              <PauseIcon className="h-6 w-6" title="Berhenti" />
            ) : (
              <PlayIcon className="h-6 w-6" title="Putar" />
            )}
          </button>
          <audio
            id={"audio-" + data.number.inSurah}
            src={data.audio.primary}
            onEnded={() => handlePlayAudio(data.number.inSurah)}
          ></audio>
        </div>
        {surah && (
          <div className="media-center font-medium">
            {data.surah.name.transliteration.id}
          </div>
        )}
        <div className="media-right">
          {/* button share */}
          {/* <button className="btn btn-ghost">
         <MapPinIcon className="h-6 w-6" />
        </button> */}
          {/* button save */}
          <button
            className="btn btn-ghost"
            onClick={() => handleBookmark(`${surahId}:${data.number.inSurah}`)}
          >
            {bookmark ? (
              <BookmarkIconSolid className="h-6 w-6" title="Batal simpan" />
            ) : (
              <BookmarkIcon className="h-6 w-6" title="Simpan" />
            )}
          </button>
        </div>
      </div>
      <div className="ayah flex justify-between items-center text-right text-lg py-5">
        <div
          className="pin last-read"
          onClick={() =>
            handleLastRead(
              surahName.name.transliteration.id,
              surahId,
              data.number.inSurah
            )
          }
          role="button"
        >
          {context.lastRead.ayah == data.number.inSurah ? (
            <MapPinIconSolid className="h-6 w-6" title="Terakhir dibaca" />
          ) : (
            <MapPinIcon
              className="h-6 w-6"
              title="Terakhir dibaca"
              style={{ filter: "opacity(0.3)" }}
            />
          )}
        </div>
        <div className="arabic">{data.text.arab}</div>
      </div>
      <div className="translate">{data.translation.id}</div>
    </>
  );
};

export default Ayah;
