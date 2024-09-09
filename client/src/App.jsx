import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Unauthorized from "./pages/Unauthorized"
import Public from "./pages/Public"
import Private from "./pages/Private"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />} />
        <Route path="/public" element={<Public />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
