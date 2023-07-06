import "./style.css";
// import bgImg from "/src/assets/icons/lantern.png";

const page = () => {
  return (
    <div className="px-6 py-2 grid grid-cols-2 gap-6">
      <div className="col-span-2">
        <div className="card card-last_read w-ful bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h2 className="card-title">Terakhir Dibaca</h2>
                <p>Al Fatihah : 4</p>
                <div className="card-actions justify-end"></div>
                <a href="" className="link link-hover">
                  Mulai
                  <i className="bi bi-chevron-right ml-2"></i>
                </a>
              </div>
              <div className="col-span-1 icon-menu_header icon-last_read h-24"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="card card-quran w-ful bg-base-100 shadow-xl h-80 bg-gradient-to-r from-bluish-cyan to-macaw-blue-green">
          <div className="card-body justify-between">
            <div className="icon-menu icon-quran h-24"></div>
            <div>
              <h2 className="card-title">Quran</h2>
              <div className="card-actions justify-end"></div>
              <a href="" className="link link-hover">
                Mulai
                <i className="bi bi-chevron-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="card w-ful bg-base-100 shadow-xl h-60 bg-gradient-to-r from-lavender to-bright-ube">
          <div className="card-body justify-between">
            <div className="icon-menu icon-tajwid h-24"></div>
            <div>
              <h2 className="card-title">Tajwid</h2>
              <div className="card-actions justify-end"></div>
              <a href="" className="link link-hover">
                Mulai
                <i className="bi bi-chevron-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="card w-ful bg-base-100 shadow-xl h-60 bg-gradient-to-r from-thulian-pink to-pink-pearl">
          <div className="card-body justify-between">
            <div className="icon-menu icon-memorize h-24"></div>
            <div>
              <h2 className="card-title">Hafalan</h2>
              <div className="card-actions justify-end"></div>
              <a href="" className="link link-hover">
                Mulai
                <i className="bi bi-chevron-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="card w-ful bg-base-100 shadow-xl h-80 bg-gradient-to-r from-dark-pastel-blue to-light-cornflower-blue">
          <div className="card-body justify-between">
            <div className="icon-menu icon-bookmark h-24"></div>
            <div>
              <h2 className="card-title">Penanda</h2>
              <div className="card-actions justify-end"></div>
              <a href="" className="link link-hover">
                Mulai
                <i className="bi bi-chevron-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
