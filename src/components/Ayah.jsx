import { useContext, useState, useEffect } from "react";
import { RootContext } from "/src/context/Root";
const Ayah = ({ data, surah = false, surahId, bookmark }) => {
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
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
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg> 
        </button> */}
          {/* button save */}
          <button
            className="btn btn-ghost"
            onClick={() => handleBookmark(`${surahId}:${data.number.inSurah}`)}
          >
            {bookmark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
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
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="ayah flex justify-end items-center text-right text-lg py-5">
        <div className="arabic">{data.text.arab}</div>
      </div>
      <div className="translate">{data.translation.id}</div>
    </>
  );
};

export default Ayah;
