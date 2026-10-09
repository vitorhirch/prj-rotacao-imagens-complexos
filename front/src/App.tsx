import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index";
import Codigo from "./pages/codigo/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codigo" element={<Codigo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
