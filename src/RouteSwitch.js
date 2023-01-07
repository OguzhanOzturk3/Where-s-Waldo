import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import './test.css';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;