import { HashRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing.jsx";
import Ask from "./Pages/Ask/Ask.jsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </HashRouter>
  );
}

export default App;