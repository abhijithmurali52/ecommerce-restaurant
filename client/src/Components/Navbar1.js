// Import necessary dependencies
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import cart icon
// import "./Navbar.css";
import { UserContext } from "./UserContext";
import { AdminContext } from "./AdminContext";
import { CartContext } from "./CartContext";
import NavbarIcons from "./NavbarIcons";
import logo1 from "../images/logo1.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cartItemCount, updateCartItemCount } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const { admin, logout: adminLogout } = useContext(AdminContext);
  const navigate = useNavigate();
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
   // State to control if the navbar is expanded or collapsed
   const [isExpanded, setIsExpanded] = useState(false);

   // Function to expand/collapse the navbar
   const toggleNavbar = () => {
     setIsExpanded(!isExpanded); // Toggle between true and false
   };
 
   // You could also create explicit expand and reduce functions:
   const expandNavbar = () => setIsExpanded(true);
   const reduceNavbar = () => setIsExpanded(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbar = document.querySelector(".navbar");
  //     if (window.scrollY > 50) {
  //       navbar.classList.add("scrolled");
  //     } else {
  //       navbar.classList.remove("scrolled");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          throw new Error("No token available");
        }

        const response = await fetch("http://localhost:2024/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });
        if (response.ok) {
          const cartData = await response.json();
          if (cartData.items && Array.isArray(cartData.items)) {
            let itemCount = 0;
            cartData.items.forEach((item) => {
              itemCount += item.quantity;
            });
            updateCartItemCount(itemCount); // Update cart item count in context
          } else {
            updateCartItemCount(0); // Set to 0 if cart items data format is incorrect or empty
          }
        } else {
          updateCartItemCount(0); // Set to 0 if fetching cart data fails
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        updateCartItemCount(0); // Set to 0 if an error occurs
        // Handle error: Redirect to login or show error message
        // Example: navigate("/login");
      }
    };

    fetchCartData();
  }, []); // Dependency array should be empty to run only once on component mount

  useEffect(() => {
    // Full Height Adjustment
    const setFullHeight = () => {
      const fullHeightElements = document.querySelectorAll(".js-fullheight");
      fullHeightElements.forEach((el) => {
        el.style.height = `${window.innerHeight}px`;
      });
    };
    setFullHeight();
    window.addEventListener("resize", setFullHeight);

    // Loader
    setTimeout(() => {
      const loader = document.getElementById("ftco-loader");
      if (loader) {
        loader.classList.remove("show");
      }
    }, 1);

    // Scroll Effects
    const handleScroll = () => {
      const navbar = document.querySelector(".ftco_navbar");
      const scrollWrap = document.querySelector(".js-scroll-wrap");
      const scrollTop = window.scrollY;

      if (scrollTop > 150) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled", "sleep");
      }

      if (scrollTop > 350) {
        navbar?.classList.add("awake");
        scrollWrap?.classList.add("sleep");
      } else {
        navbar?.classList.remove("awake");
        scrollWrap?.classList.remove("sleep");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setFullHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".ftco-animate");
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.visibility = "visible";
    });
  }, []);
  return (

    <nav
      class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" href="/">
          <img
            src={logo1}
            alt="Ashraf's Logo"
            style={{ width: "100px", height: "100px" }}
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          // data-toggle="collapse"
          // data-target="#ftco-nav"
          aria-controls="navbarNav"
          aria-expanded={isExpanded ? "true" : "false"} // Conditional based on state         
           aria-label="Toggle navigation"
           onClick={toggleNavbar} // OnClick to toggle navbar
        >
          <span class="oi oi-menu"></span> Menu
        </button>
        <div className="d-lg-none d-flex align-items-center ml-auto">
      <NavbarIcons />
    </div>

        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a href="/" class="  text-white nav-link ">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a
                href="about"
                class="text-white nav-link"
                style={{ color: "white" }}
              >
                About
              </a>
            </li>
            <li class="nav-item">
              <a
                href="chef"
                class="text-white nav-link"
                style={{ color: "white" }}
              >
                Chef
              </a>
            </li>
            <li className="nav-item dropdown custom-dropdown">
          <a
            className="nav-link dropdown-toggle text-white custom-nav-link"
            href="#"
            id="customMenuDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </a>
          <ul
  className="dropdown-menu custom-dropdown-menu"
  aria-labelledby="customMenuDropdown"
>
  <li>
    <a className="dropdown-item custom-dropdown-item" href="menu">Main Menu</a>
  </li>
  <li>
    <a className="dropdown-item custom-dropdown-item" href="menu/drinks">Drinks</a>
  </li>
  <li>
    <a className="dropdown-item custom-dropdown-item" href="menu/desserts">Desserts</a>
  </li>
</ul>


        </li>
            <li class="nav-item">
              <a
                href="/reservation"
                class="text-white nav-link"
                style={{ color: "white" }}
              >
                Reservation
              </a>
            </li>
            <li class="nav-item">
              <a
                href="blog"
                class="text-white nav-link"
                style={{ color: "white" }}
              >
                Blog
              </a>
            </li>
            <li class="nav-item">
              <a href="/contact" class="text-white nav-link">
                Contact
              </a>
            </li>
             
        <li className="nav-item">
          <a href="/menu" className="btn btn-primary" style={{ marginTop: "1.3rem" }}>
            Order Now
          </a>
        </li>

        {/* Navbar Icons - Flex adjusted for proper alignment */}
        <li
          className="nav-item d-flex align-items-center"
          style={{ marginLeft: "10px" }}
        >
          <NavbarIcons />
        </li>
            
            {/* <p>
              <a
                href="/menu"
                class="btn btn-primary"
                style={{ marginTop: " 1.3rem" }}
              >
                Order Now
              </a>
              
            </p>
            <li>
            <NavbarIcons/>
            </li> */}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
