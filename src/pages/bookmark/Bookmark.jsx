import { useContext, useState, useEffect } from "react";
import { RootContext } from "/src/context/Root";
import axios from "axios";
import Ayah from "/src/components/Ayah.jsx";
import Loading from "/src/components/Loading";

const Bookmark = () => {
  const context = useContext(RootContext);
  const loadStorage = context.bookmarks;

  const [storage, setStorage] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);

  const getAyah = async (surahId, ayahNumber) => {
    try {
      const urlAyah = `https://api.quran.gading.dev/surah/${surahId}/${ayahNumber}`;
      const getAyah = await axios.get(urlAyah);
      const ayahData = getAyah.data.data;
      const data = { ...ayahData, surahId };
      setBookmarksData((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  //   dibuat 2 use effect agar terhindar dari invinite loop
  useEffect(() => {
    window.scrollTo(0, 0);
    setStorage(loadStorage);
  }, []);

  useEffect(() => {
    storage?.map((data) => {
      const split = data.split(":");
      const surahId = split[0];
      const numberAyah = split[1];

      getAyah(surahId, numberAyah);
    });
  }, [storage]);

  return (
    <div className="bookmark min-h-screen px-4 mt-28">
      <div className="overflow-x-auto mt-2">
        {loadStorage ? (
          bookmarksData.length === 0 ? (
            <Loading count={7} height="3rem" style={{ marginBottom: "1rem" }} />
          ) : (
            <table className="table">
              <tbody>
                {bookmarksData.map((verse, index) => (
                  <tr key={index}>
                    <td>
                      <Ayah
                        data={verse}
                        surahId={verse.surahId}
                        feature={"bookmark"}
                        checkBookmark={context.checkBookmark(
                          `${verse.surahId}:${verse.number.inSurah}`
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <div className="flex items-center justify-around h-screen">
            Kosong
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
