import HamburgerMenu from "./components/hambuger_menu";
import Footer from "./components/footer";
import Home from "./components/home_page";
import React from "react";
import Achievement from "./components/achievement_page";
import Members from "./components/members_page";
import News from "./components/news_page";
import SignUp from "./components/signup_page";
import SelectedMember from "./components/selectedMember_page";

import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
      <div>
          <HamburgerMenu />
          <Routes >
              <Route path="/" element={<Home/>} />
              <Route path="/Home" element={<Home/>} />
              <Route path="/Members" element={<Members/>} />
              <Route path="/Achievement" element={<Achievement/>} />
              <Route path="/News" element={<News/>} />
              <Route path="/SignUp" element={<SignUp/>} />
              <Route path="/SelectedMember" element={<SelectedMember/>} />
              

          </Routes>
          <Footer/>
      </div>
  );
};

export default App;
