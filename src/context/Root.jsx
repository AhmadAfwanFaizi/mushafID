import { createContext, useState, useEffect } from "react";

const RootContext = createContext();
const RootProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [audio, setAudio] = useState("");
  const [lastRead, setLastRead] = useState({});
  const [memorizes, setMemorizes] = useState([]);

  const checkBookmark = (param) => {
    const check = bookmarks
      ? bookmarks.find((bookmark) => bookmark === param)
      : null;
    if (!check) return false;

    return true;
  };

  const insertBookmark = (param) => {
    localStorage.setItem("quranAppBookmark", JSON.stringify(param));
    setBookmarks(param);
  };

  const handleBookmark = (dataInsert) => {
    if (!bookmarks) {
      insertBookmark([dataInsert]);
    } else {
      if (checkBookmark(dataInsert) === true) {
        const newStorage = bookmarks.filter(
          (bookmark) => bookmark !== dataInsert
        );
        insertBookmark(newStorage);
      } else {
        const newStorage = [...bookmarks, dataInsert];
        insertBookmark(newStorage);
      }
    }
  };

  const handleLastRead = (namaSurah, surahId, ayah) => {
    const param = { namaSurah, surahId, ayah };
    setLastRead(param);
    localStorage.setItem("quranAppLastRead", JSON.stringify(param));
  };

  const checkMemorize = (param) => {
    const check = memorizes
      ? memorizes.find((memorize) => memorize === param)
      : null;
    if (!check) return false;

    return true;
  };

  const insertMemorize = (param) => {
    localStorage.setItem("quranAppMemorize", JSON.stringify(param));
    setMemorizes(param);
  };

  const handleMemorize = (dataInsert) => {
    if (!memorizes) {
      insertMemorize([dataInsert]);
    } else {
      if (checkMemorize(dataInsert) === true) {
        const newStorage = memorizes.filter(
          (memorize) => memorize !== dataInsert
        );
        insertMemorize(newStorage);
      } else {
        const newStorage = [...memorizes, dataInsert];
        insertMemorize(newStorage);
      }
    }
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("quranAppBookmark"));
    setBookmarks(bookmarks);

    const lastRead = JSON.parse(localStorage.getItem("quranAppLastRead"));
    setLastRead(lastRead);

    const memorizes = JSON.parse(localStorage.getItem("quranAppMemorize"));
    setMemorizes(memorizes);
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
        memorizes,
        checkMemorize,
        handleMemorize,
        dataModal,
        showModal,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export { RootContext, RootProvider };
