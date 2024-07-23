import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "./components/Home";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { MainWebpageContainer } from "./components/MainWebpageContainer";

function App() {
  return (
    <>
      {/* <Navbar />
      <div className="fixed h-screen w-screen overflow-hidden App">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 object-cover w-full h-full z-[-2]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="opacity-background"></div>
      </div> */}
      <Routes>
        <Route path="/" element={<MainWebpageContainer />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
