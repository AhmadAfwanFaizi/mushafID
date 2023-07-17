import { createContext, useState, useEffect } from "react";

const RootContext = createContext();
const RootProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [audio, setAudio] = useState("");

  const checkBookmark = (param) => {
    const check = bookmarks
      ? bookmarks.find((bookmark) => bookmark === param)
      : null;
    if (!check) return false;

    return true;
  };

  const insertStorage = (param) => {
    localStorage.setItem("quranApp", JSON.stringify(param));
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

  useEffect(() => {
    const loadStorage = JSON.parse(localStorage.getItem("quranApp"));
    setBookmarks(loadStorage);
  }, []);

  return (
    <RootContext.Provider
      value={{ audio, setAudio, bookmarks, checkBookmark, handleBookmark }}
    >
      {children}
    </RootContext.Provider>
  );
};

export { RootContext, RootProvider };
