import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Detect from "./Pages/Detect";
import About from "./Pages/About";
import Threatlab from "./Pages/Threatlab";
import APIDoc from "./Pages/APIDoc";
import ScrollToTop from "./components/ScrollToTop";
import OfflineDetector from "./components/OfflineDetector";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <OfflineDetector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/about" element={<About />} />
        <Route path="/threatlab" element={<Threatlab />} />
        <Route path="/learn" element={<Threatlab />} />
        <Route path="/api" element={<APIDoc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
