import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <div className="App">
        <video autoPlay loop muted className="background-video">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="opacity-background"></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
