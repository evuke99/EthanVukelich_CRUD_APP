import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="bg-base-100">
      <BrowserRouter>
        {/* <div className="">
          <Navbar />
        </div> */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
