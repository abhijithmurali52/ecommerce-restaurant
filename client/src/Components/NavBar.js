import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar1.css';

function NavBar() {
  const [navbarVisible, setNavbarVisible] = useState(false);

  // This function will be used to show the navbar when hovering
  const handleMouseEnter = () => {
    setNavbarVisible(true);
  };

  const handleMouseLeave = () => {
    setNavbarVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setNavbarVisible(true);
      } else {
        setNavbarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
    <div 
      className="navbar-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Navbar
        collapseOnSelect
        expand="lg"
        className={navbarVisible ? 'navbar navbar-show' : 'navbar navbar-hide'}
      >
        <Navbar.Brand href="/">
          <img
            src="https://www.ashrafs.co.uk/imgd/logo.png"
            width="auto"
            height="100"
            className="d-inline-block align-top"
            alt="Restaurant Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#menus">Menus</Nav.Link>
            <Nav.Link href="#reservations">Reservations</Nav.Link>
            <Nav.Link href="#specials">Specials</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    </div>
  );
}

export default NavBar;
