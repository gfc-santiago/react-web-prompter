import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import View from "./viewer/viewer";
import Directory from "./controller/directory";
import Lyrics from "./controller/lyrics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/remote" element={<Directory />} />
          <Route path="/remote/:id" element={<Lyrics />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
