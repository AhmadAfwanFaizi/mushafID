import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Quran from "./pages/quran/Quran";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quran",
    element: <Quran />,
    children: [
      {
        path: "/quran/:surahId",
        element: <Quran />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="app w-screen min-h-max lg:w-1/2">
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
