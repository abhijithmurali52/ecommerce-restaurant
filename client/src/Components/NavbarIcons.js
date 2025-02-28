// NavbarIcons.js
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AdminContext } from "./AdminContext";
import { CartContext } from "./CartContext";


const NavbarIcons = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { cartItemCount, updateCartItemCount } = useContext(CartContext);
    const { user, logout } = useContext(UserContext);
    const { admin, logout: adminLogout } = useContext(AdminContext);
    const navigate = useNavigate();
  
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
    <div className="navbar__icons">
    <div className="navbar__user mr-3">
      <FontAwesomeIcon
        icon={faUser}
        className="navbar__user-icon"
        onClick={toggleUserMenu}
        style={{ fontSize: '1.2rem' }}
      />
      <ul className={`navbar__user-menu ${isUserMenuOpen ? "active" : ""}`}>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>{user.username}</li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>

    <div className="navbar__cart">
      <Link to="/cart" className="cart-icon-wrapper">
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="navbar__cart-icon"
          style={{ fontSize: '1.2rem' }}
        />
        <span className="cart-item-count">{cartItemCount}</span>
      </Link>
    </div>
  </div>
  );
};

export default NavbarIcons;
