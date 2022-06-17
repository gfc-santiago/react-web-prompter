import { BrowserRouter, Routes, Route } from "react-router-dom";
import Control from "./controller/controller";
import Viewer from "./viewer/viewer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/view" element={<Viewer />} />
          <Route path="/control" element={<Control />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
