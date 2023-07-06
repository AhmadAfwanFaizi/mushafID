import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/home";

function App() {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="app w-screen min-h-max lg:w-1/2">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
