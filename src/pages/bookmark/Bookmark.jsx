import { useContext, useState, useEffect } from "react";
import { RootContext } from "/src/context/Root";

import axios from "axios";
import Ayah from "/src/components/Ayah.jsx";

const Bookmark = () => {
  const loadStorage = JSON.parse(localStorage.getItem("quranApp"));
  const context = useContext(RootContext);

  const [storage, setStorage] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);

  const getAyah = async (surahId, ayahNumber) => {
    try {
      const url = `https://api.quran.gading.dev/surah/${surahId}/${ayahNumber}`;
      const res = await axios.get(url);
      const resData = res.data.data;
      const data = { ...resData, surahId };
      setBookmarksData((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  //   dibuat 2 use effect agar terhindar dari invinite loop
  useEffect(() => {
    setStorage(loadStorage);
  }, []);

  useEffect(() => {
    storage.map((data) => {
      const split = data.split(":");
      const surahId = split[0];
      const numberAyah = split[1];

      getAyah(surahId, numberAyah);
    });
  }, [storage]);

  const checkBookmark = (param) => {
    return context.checkBookmark(param);
  };

  const handlePlayMedia = (param) => {
    console.log(param);
  };

  return (
    <div className="bookmark min-h-screen px-4 mt-28">
      <div className="overflow-x-auto mt-2">
        <table className="table">
          <tbody>
            {bookmarksData.length === 0
              ? "Loading..."
              : bookmarksData.map((verse, index) => (
                  <tr key={index}>
                    <td>
                      <Ayah
                        data={verse}
                        surahId={verse.surahId}
                        bookmark={checkBookmark(
                          `${verse.surahId}:${verse.number.inSurah}`
                        )}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookmark;
