import HamburgerMenu from "./components/hambuger_menu";
import Footer from "./components/footer";
import Home from "./components/home_page";
import React from "react";
import Achievement from "./components/achievement_page";
import Members from "./components/members_page";
import News from "./components/news_page";
import SignUp from "./components/signup_page";
import SelectedMember from "./components/selectedMember_page";
import SelectedCoach from "./components/selectedCoach_page";
import SelectedExco from "./components/selectedExco_page";
import EditCoach from "./components/editCoach_page";
import EditExco from "./components/editExco_page";
import EditMember from "./components/editMember_Page";
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
              <Route path="/SelectedCoach/:id" element={<SelectedCoach/>} />
              <Route path="/SelectedExco/:id" element={<SelectedExco/>} />
              <Route path="/SelectedMember/:id" element={<SelectedMember/>} />
              <Route path="/EditCoach/:id" element={<EditCoach/>} />
              <Route path="/EditExco/:id" element={<EditExco/>} />
              <Route path="/EditMember/:id" element={<EditMember/>} />
              

          </Routes>
         
      </div>
  );
};

export default App;
