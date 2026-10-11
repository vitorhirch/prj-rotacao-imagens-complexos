import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index";
import Codigo from "./pages/codigo/Index";
import Matematica from "./pages/matematica/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codigo" element={<Codigo />} />
        <Route path="/matematica" element={<Matematica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
