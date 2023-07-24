import { useContext, useState } from "react";
import { RootContext } from "/src/context/Root";
import PropTypes from "prop-types";

import {
  PlayIcon,
  PauseIcon,
  MapPinIcon,
  // ShareIcon,
  BookmarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  MapPinIcon as MapPinIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from "@heroicons/react/24/solid";

const Ayah = ({
  surahName,
  data,
  surahId,
  feature,
  checkBookmark,
  checkMemorize,
}) => {
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

  const handleMemorize = (param) => {
    context.handleMemorize(param);
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
        {feature === "bookmark" ? (
          <div className="media-center font-medium">
            {data.surah.name.transliteration.id}
          </div>
        ) : (
          ""
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
            {checkBookmark ? (
              <BookmarkIconSolid className="h-6 w-6" title="Batal simpan" />
            ) : (
              <BookmarkIcon className="h-6 w-6" title="Simpan" />
            )}
          </button>
        </div>
      </div>
      {feature === "quran" ? (
        <div className="ayah flex justify-end items-center text-right py-5">
          <div className="arabic text-xl">{data.text.arab}</div>
          <button
            className="btn btn-ghost pin last-read"
            onClick={() =>
              handleLastRead(
                surahName.transliteration.id,
                surahId,
                data.number.inSurah
              )
            }
          >
            {context.lastRead &&
            context.lastRead.surahId == surahId &&
            context.lastRead.ayah == data.number.inSurah ? (
              <MapPinIconSolid className="h-6 w-6" title="Terakhir dibaca" />
            ) : (
              <MapPinIcon
                className="h-6 w-6"
                title="Terakhir dibaca"
                style={{ filter: "opacity(0.3)" }}
              />
            )}
          </button>
        </div>
      ) : feature === "memorize" ? (
        <div className="ayah flex justify-end items-center text-right py-5">
          <div className="arabic text-xl">{data.text.arab}</div>
          <button
            className="btn btn-ghost pin last-read"
            onClick={() => handleMemorize(`${surahId}:${data.number.inSurah}`)}
          >
            {checkMemorize ? (
              <CheckCircleIconSolid className="h-6 w-6" title="Dihafal" />
            ) : (
              <CheckCircleIcon
                className="h-6 w-6"
                title="Dihafal"
                style={{ filter: "opacity(0.3)" }}
              />
            )}
          </button>
        </div>
      ) : (
        <div className="ayah text-right py-5">
          <div className="arabic text-xl">{data.text.arab}</div>
        </div>
      )}

      <div className="translate">{data.translation.id}</div>
    </>
  );
};

Ayah.propTypes = {
  surahName: PropTypes.object,
  data: PropTypes.object.isRequired,
  surahId: PropTypes.string.isRequired,
  feature: PropTypes.string.isRequired,
  checkBookmark: PropTypes.bool.isRequired,
  checkMemorize: PropTypes.bool,
};

Ayah.defaultProps = {};

export default Ayah;
