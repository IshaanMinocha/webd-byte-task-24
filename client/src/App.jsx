import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Unauthorized from "./pages/Unauthorized"
import Public from "./pages/Public"
import Private from "./pages/Private"
import AuthorizeFirst from "./pages/AuthorizeFirst";
import PrivateRoute from "./PrivateRoute";
import { useState } from "react";

function App() {

  const [isVerified, setIsVerified] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public" element={<Public />} />
        {/* <Route path="/private" element={<Private />} /> */}
        <Route path="/private" element={
          <PrivateRoute isVerified={isVerified}>
            <Private />
          </PrivateRoute>
        } />
        <Route path="/authorizefirst" element={<AuthorizeFirst setIsVerified={setIsVerified} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
