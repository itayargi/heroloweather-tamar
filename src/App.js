import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Favorites from "./screens/Favorites";
import Header from "./components/Header";
import screenNames from "./utils/screenNames";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path={screenNames.home} element={<Home />} />
          <Route path={screenNames.favorite} element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
