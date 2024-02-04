import HamburgerMenu from "./components/hamburgerMenu/hambuger_menu";
import Footer from "./components/footer/footer";
import Home from "./components/home/home_page";
import React from "react";
import Achievement from "./components/achievement/achievement_page";
import Members from "./components/member/members_page";
import News from "./components/news/news_page";
import SignUp from "./components/signup/signup_page";
import SelectedMember from "./components/selectedMember/selectedMember_page";
import SelectedCoach from "./components/selectedCoach/selectedCoach_page";
import SelectedExco from "./components/selectedExco/selectedExco_page";
import EditCoach from "./components/editCoach/editCoach_page";
import EditExco from "./components/editExco/editExco_page";
import EditMember from "./components/editMember/editMember_Page";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";


const App = () => {
    return (
        <div>
            <HamburgerMenu />
            <Routes >
                <Route path="/" element={<Members />} />
                <Route path="/Members" element={<Members />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SelectedCoach/:id" element={<SelectedCoach />} />
                <Route path="/SelectedExco/:id" element={<SelectedExco />} />
                <Route path="/SelectedMember/:id" element={<SelectedMember />} />
                <Route path="/EditCoach/:id" element={<EditCoach />} />
                <Route path="/EditExco/:id" element={<EditExco />} />
                <Route path="/EditMember/:id" element={<EditMember />} />
                <Route path="/Login" element={<Login />} />


            </Routes>

        </div>
    );
};

export default App;
