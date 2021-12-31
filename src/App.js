import "./App.css";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Add from "./Add";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/add" element={<Add />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
