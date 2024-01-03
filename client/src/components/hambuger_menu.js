import React, { useState } from "react";
import { Navbar, Nav, NavbarBrand } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./hamburger_menu.css";

function HamburgerMenu() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>

            <Navbar bg="light" expand="" className="yellow-border-navbar">

                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />

                <NavbarBrand className="mx-5" href="#" >
                    <span class="navbar-brand mb-0 h1">TaeKwonConnect</span>
                </NavbarBrand>
                <FaUser size={20} onClick={() => { console.log("user clicked"); }}></FaUser>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="text-dark text-decoration-none mb-1" href="#" to="/Home">
                            Home
                        </NavLink>
                        <NavLink className="text-dark text-decoration-none mb-1" href="#" to="/Members">
                            Members
                        </NavLink>
                        <NavLink className="text-dark text-decoration-none mb-1" href="#" to="/Achievement">
                            Achievements
                        </NavLink>
                        <Nav.Link href="#" onClick={() => { setExpanded(false); console.log("news clicked"); }}>
                            News
                        </Nav.Link>
                        <Nav.Link >

                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>


            </Navbar>
        </div>

    );
}

export default HamburgerMenu;
