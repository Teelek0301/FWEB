import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, NavbarBrand } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function HamburgerMenu() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            
            <Navbar bg="light" expand="lg">
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <NavbarBrand className="mx-auto" href="#" >
                <span class="navbar-brand mb-0 h1">TaeKwonConnect</span>
                </NavbarBrand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" onClick={() => setExpanded(false)}>
                            Home
                        </Nav.Link>
                        <Nav.Link href="#" onClick={() => setExpanded(false)}>
                            Members
                        </Nav.Link>
                        <Nav.Link href="#" onClick={() => setExpanded(false)}>
                            Achievements
                        </Nav.Link>
                        <Nav.Link href="#" onClick={() => setExpanded(false)}>
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
