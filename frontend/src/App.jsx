import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Pages/Home";
import Detect from "./Pages/Detect";
import About from "./Pages/About";
import Learn from "./Pages/Learn";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
