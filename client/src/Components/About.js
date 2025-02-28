// src/About.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [selectedLink, setSelectedLink] = useState("about");

  const appStyle = {
    margin: 0,
    padding: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    backgroundImage: `url(${process.env.PUBLIC_URL}/res4.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    position: "relative",
  };
  const contactInfoStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    backdropFilter: "blur(10px)", // Adding blur effect
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Background color with opacity
    padding: "10px 0", // Adjust padding as needed
    textAlign: "center",
  };

  const navBarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    backdropFilter: "blur(5px)", // Adding blur effect
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Background color with opacity
    padding: "20px 0", // Adjust padding as needed
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "top 0.5s", // Smooth transition for showing/hiding
  };

  const navTextStyle = (isHovered, isSelected) => ({
    color: isHovered || isSelected ? "#ff6347" : "#000",
    margin: "0 10px",
    textDecoration: isSelected ? "underline" : "none",
    // backgroundColor: '#d3d3d3',
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: isHovered || isSelected ? "18px" : "16px",
    fontWeight: isHovered || isSelected ? "bold" : "normal",
    fontFamily: "Georgia, serif",
    transition: "color 0.5s, font-size 0.5s, text-decoration 0.5s",
  });

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    height: "40px",
    width: "auto",
    marginRight: "10px",
  };

  const searchBarStyle = {
    padding: "5px 10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginRight: "20px",
  };

  const aboutPageStyle = {
    padding: "20px",
    fontFamily: "Georgia, serif",
    color: "#333",
    textAlign: "center",
  };
  const contentStyle = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    maxWidth: "600px",
  };
  const blurBackgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    document.getElementById("navbar").style.top = "0";
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      document.getElementById("navbar").style.top = "-100px";
    }, 5000); // 3 seconds delay
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const aboutDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dolor sed turpis suscipit 
                        volutpat. Donec sit amet enim sed nisi semper pulvinar. Nulla facilisi. Donec auctor auctor velit, non mattis 
                        dolor gravida vel. Vestibulum fringilla lacinia aliquet. Duis vehicula luctus nibh, sed mattis justo elementum 
                        vitae. Nullam auctor urna sed sagittis porttitor. Sed auctor neque nec tortor volutpat, sed bibendum justo 
                        condimentum. Suspendisse efficitur dictum nunc, at auctor nisi cursus eget. Sed maximus ut ex vel dapibus. 
                        Cras sagittis elit at dui malesuada, et finibus velit feugiat. Cras sodales nulla eget lacinia laoreet. Ut 
                        dictum risus eu dui varius, eu convallis odio sodales. Etiam eu velit at libero elementum molestie nec sit amet 
                        dolor.`;

  return (
    <div className="page-transition" style={appStyle}>
      <nav id="navbar" style={{ ...navBarStyle, top: "-100px" }}>
        <div style={logoContainerStyle}>
          <img
            src={`${process.env.PUBLIC_URL}/reslogo.png`}
            alt="Logo"
            style={logoStyle}
          />
          <h2 style={{ margin: "0", fontSize: "20px" }}>Restaurant</h2>
        </div>

        <div>
          <a
            href="/"
            style={navTextStyle(
              hoveredLink === "home",
              selectedLink === "home"
            )}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => setSelectedLink("home")}
          >
            HOME
          </a>
          <a
            href="/about"
            style={navTextStyle(
              hoveredLink === "about",
              selectedLink === "about"
            )}
            onMouseEnter={() => setHoveredLink("about")}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => setSelectedLink("about")}
          >
            ABOUT
          </a>
          <a
            href="/menu"
            style={navTextStyle(
              hoveredLink === "menu",
              selectedLink === "menu"
            )}
            onMouseEnter={() => setHoveredLink("menu")}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => setSelectedLink("menu")}
          >
            MENU
          </a>
          <a
            href="/contact"
            style={navTextStyle(
              hoveredLink === "contact",
              selectedLink === "contact"
            )}
            onMouseEnter={() => setHoveredLink("contact")}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => setSelectedLink("contact")}
          >
            CONTACT
          </a>{" "}
        </div>
        <input type="text" placeholder="Search..." style={searchBarStyle} />
      </nav>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "50px",
          zIndex: 99,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div style={blurBackgroundStyle}>
        <div style={contentStyle}>
          <div style={aboutPageStyle}>
            <h1>About Us</h1>
            <p>{aboutDescription}</p>
          </div>
        </div>
      </div>
      <div style={contactInfoStyle}>
        <p>Contact us: example@example.com | 123-456-7890</p>
      </div>
    </div>
  );
};

export default About;
