import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import View from "./viewer/viewer";
import Directory from "./controller/directory";
import Lyrics from "./controller/lyrics";
import { ConfigProvider } from "./components/config/use-config";
import { SocketProvider } from "./components/sockets/use-socket";
import { ServiceProvider } from "./components/service/use-service";
import RightView from "./viewer/right-viewer";

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/right" element={<RightView />} />
              <Route exact path="/" element={<View />} />
              <Route
                path="/remote"
                element={
                  <ServiceProvider>
                    <Outlet />
                  </ServiceProvider>
                }
              >
                <Route path="/remote" element={<Directory />} />
                <Route path="/remote/:id" element={<Lyrics />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
