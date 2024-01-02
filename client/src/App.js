import HamburgerMenu from "./components/hambuger_menu";
import Footer from "./components/footer";
import Home from "./components/home_page";
import React from "react";
import Achievement from "./components/achievement_page";

import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
      <div>
          <HamburgerMenu />
          <Routes >
              <Route exact path="/" element={<Home/>} />
              <Route path="/Achievement" element={<Achievement/>} />

          </Routes>
          <Footer/>
      </div>
  );
};

export default App;
