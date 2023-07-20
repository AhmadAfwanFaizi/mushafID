import { createContext, useState, useEffect } from "react";

const RootContext = createContext();
const RootProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [audio, setAudio] = useState("");
  const [lastRead, setLastRead] = useState({});

  const checkBookmark = (param) => {
    const check = bookmarks
      ? bookmarks.find((bookmark) => bookmark === param)
      : null;
    if (!check) return false;

    return true;
  };

  const insertStorage = (param) => {
    localStorage.setItem("quranAppBookmark", JSON.stringify(param));
    setBookmarks(param);
  };
  const handleBookmark = (dataInsert) => {
    if (!bookmarks) {
      insertStorage([dataInsert]);
    } else {
      if (checkBookmark(dataInsert) === true) {
        const newStorage = bookmarks.filter(
          (bookmark) => bookmark !== dataInsert
        );
        insertStorage(newStorage);
      } else {
        const newStorage = [...bookmarks, dataInsert];
        insertStorage(newStorage);
      }
    }
  };

  const handleLastRead = (namaSurah, surahId, ayah) => {
    const param = { namaSurah, surahId, ayah };
    setLastRead(param);
    localStorage.setItem("quranAppLastRead", JSON.stringify(param));
  };

  useEffect(() => {
    const bookmark = JSON.parse(localStorage.getItem("quranAppBookmark"));
    setBookmarks(bookmark);

    const lastRead = JSON.parse(localStorage.getItem("quranAppLastRead"));
    setLastRead(lastRead);
  }, []);

  const [dataModal, setDataModal] = useState({
    title: "",
    subtitle: "",
  });
  const showModal = (title, subtitle) => {
    setDataModal({
      title,
      subtitle,
    });
    window.modal.showModal();
  };

  return (
    <RootContext.Provider
      value={{
        audio,
        setAudio,
        bookmarks,
        checkBookmark,
        handleBookmark,
        lastRead,
        handleLastRead,
        dataModal,
        showModal,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export { RootContext, RootProvider };
