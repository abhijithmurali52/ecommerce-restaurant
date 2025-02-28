// src/Components/Home.js
import React, { useState, useEffect, useContext, useRef } from "react";
import { Modal, Form, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import axios from "axios";
import { UserContext } from "./UserContext";
import { AdminContext } from "./AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import Navbar from "./Navbar1";

const Home = () => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [selectedLink, setSelectedLink] = useState("home");
  const { user, logout } = useContext(UserContext);
  const { admin, logout: adminLogout } = useContext(AdminContext);
  const menuRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null)
  const navigate = useNavigate();
  console.log(user);
  const handleMenuClick = () => {
    menuRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleContactClick = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleAboutClick = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const appStyle = {
    margin: 0,
    padding: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    backgroundImage: `url(${process.env.PUBLIC_URL}/pic.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundAttachment: "fixed",
    height: "100vh",
    width: "100vw",
    position: "relative",
    // overflowY: "scroll",
  };
  const contactInfoStyle = {
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    backdropFilter: "blur(10px)",
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor:"#f8f8f8",
    padding: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const socialMediaStyle = {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
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
    justifyContent: "space-between", // Ensure logo on the left
    alignItems: "center",
    transition: "top 0.5s", // Smooth transition for showing/hiding
  };
  
  const navTextStyle = (isHovered, isSelected) => ({
    color: isHovered || isSelected ? "#ff6347" : "#000",
    margin: "0 10px",
    textDecoration: isSelected ? "underline" : "none",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: isHovered || isSelected ? "18px" : "16px",
    fontWeight: isHovered || isSelected ? "bold" : "normal",
    fontFamily: "Georgia, serif",
    transition: "color 0.5s, font-size 0.5s, text-decoration 0.5s",
  });
  const searchBarStyle = {
    padding: "5px 10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginRight: "20px",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    height: "70px",
    width: "auto",
    marginLeft: "20px",
  };

  const linkContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  };

  const titleStyle = {
    fontSize: "50px", // Adjust the font size
    fontFamily: "Georgia, serif", // Adjust the font family
    lineHeight: "1.2", // Adjust the line height
    marginTop: "5rem",
    transition: "transform 0.3s", // Smooth animation
  };

  const subtitleStyle = {
    textAlign: "center",
    fontSize: "18px", // Adjust the font size
    lineHeight: "1.2", // Adjust the line height
    marginTop: "10px", // Adjust the margin
  };

  const spacerStyle = {
    height: "180px", // Adjust height as needed to push the menu section down
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#ff6347", // Adjust button color
    color: "#fff",
    border: "none",
    borderRadius: "20px", // Make the buttons curvy
    padding: "10px 20px",
    margin: "0 10px",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none", // Remove underline from links
    transition: "transform 0.3s", // Smooth animation
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

  const dishContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };
  const dishStyle = {
    position: "absolute",
    top: "20%",
    left: "0",
    transform: "translateY(-50%)",
    width: "70px",
    height: "70px",
    backgroundImage: `url(${process.env.PUBLIC_URL}/reslogo.png)`, // Change to your dish image
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    animation: "moveRight 10s infinite linear",
  };

  const textStyle = {
    position: "absolute",
    top: "50%",
    left: "0",
    transform: "translateY(-50%)",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    animation: "moveRight 10s infinite linear",
  };

  const sectionContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '0 0px',
    marginTop: '0px',
  };

  const aboutSectionStyle = {
    flex: 1,
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  };

  const aboutImageStyle = {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const [showModal, setShowModal] = useState(false);

  const handleBookTableClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const modalBodyStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/res.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
    borderRadius: "10px",
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  const handleClick = () => {
    navigate("/admindashboard");
  };

  const menuStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "90%",
    margin: "0 auto",
    marginBottom: "1rem",
  };

  const whatsOnYourMindStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "20px 0",
    color: "#ff6347",
  };

  const roundImageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "40px",
  };

  const roundImageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const roundImageTitleStyle = {
    textAlign: "center",
    fontSize: "1rem",
    marginTop: "8px",
    color: "#333",
  };

  const menuRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
    padding: "20px", // Added padding to center align items
    boxSizing: "border-box", // Ensure padding doesn't affect width
  };

  const menuItemCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "0 0 16px 0", // Adjusted padding to remove top padding
    flex: "1 1 calc(20% - 20px)", // Adjust width to fit 5 items in a row, flex-basis with flex-grow and flex-shrink
    maxWidth: "calc(20% - 20px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
    transition: "transform 0.3s, box-shadow 0.3s",
    marginBottom: "20px", // Add margin to separate rows
    overflow: "hidden", // Ensure the image fills the card width
    position: "relative", // Added for the vignette effect
  };

  const menuImageStyle = {
    width: "100%",
    height: "150px", // Adjust height to fit more items in a row
    objectFit: "cover",
  };

  const vignetteStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "150px",
    background: "radial-gradient(circle, transparent, rgba(0,0,0,0.8))",
  };

  const menuTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    margin: "0 0 8px 0", // Adjusted margins
    color: "#333",
  };
  const menuPriceStyle = {
    fontSize: "1rem",
    color: "#888",
  };

  const menuItemDescriptionStyle = {
    fontSize: "0.9rem",
    color: "#666",
    margin: "8px 0",
  };

  // Separate arrays for "What's on your mind?" and regular menu items
  const whatsOnYourMindItems = [
    {
      itemName: "Special Dish",
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Special Dish",
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Special Dish",
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Special Dish",
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Special Dish",
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Special Dish",
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
  ];

  const regularMenuItems = [
    {
      itemName: "Pizza",
      itemDescription: "Delicious cheese pizza with fresh toppings.",
      price: 12.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Burger",
      itemDescription: "Juicy beef burger with crispy fries.",
      price: 10.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Pasta",
      itemDescription: "Creamy Alfredo pasta with garlic bread.",
      price: 14.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Salad",
      itemDescription: "Fresh garden salad with vinaigrette.",
      price: 9.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Sushi",
      itemDescription: "Assorted sushi platter with soy sauce.",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Steak",
      itemDescription: "Tender sirloin steak with mashed potatoes.",
      price: 24.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Soup",
      itemDescription: "Homemade vegetable soup with crusty bread.",
      price: 7.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Dessert",
      itemDescription: "Decadent chocolate lava cake with vanilla ice cream.",
      price: 8.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Mocktail",
      itemDescription: "Refreshing mixed fruit mocktail with mint leaves.",
      price: 5.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
    {
      itemName: "Coffee",
      itemDescription: "Aromatic espresso with steamed milk.",
      price: 4.99,
      imageUrl: "https://via.placeholder.com/300x200", // Replace with your image URL
    },
  ];

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/menuItems");
        setMenuItems(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching items");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div style={appStyle}>
=    <nav id="navbar" style={{ ...navBarStyle, top: "-100px" }}>
<div style={logoContainerStyle}>
  <img
    src="https://www.ashrafs.co.uk/imgd/logo.png"
    alt="Logo"
    style={logoStyle}
  />
</div>

<div style={linkContainerStyle}>
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
    
    style={navTextStyle(
      hoveredLink === "about",
      selectedLink === "about"
    )}
    onMouseEnter={() => setHoveredLink("about")}
    onMouseLeave={() => setHoveredLink(null)}
    onClick={handleAboutClick}
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
    // onClick={handleMenuClick}
  >
    MENU
  </a>
  <a
   
    style={navTextStyle(
      hoveredLink === "contact",
      selectedLink === "contact"
    )}
    onMouseEnter={() => setHoveredLink("contact")}
    onMouseLeave={() => setHoveredLink(null)}
    onClick={handleContactClick}
  >
    CONTACT
  </a>
</div>
{/* <input type="text" placeholder="Search..." style={searchBarStyle} /> */}
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
     
      <header style={{ textAlign: "center", paddingTop: "120px" }}>
        <h1 style={titleStyle}>
          <span>Best Food</span> <br />
          <span>For Your Taste!</span>
        </h1>
      </header>
      <h3
        style={subtitleStyle}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        <span>Discover cuisines and unforgettable moments</span> <br />
        <span>in our welcoming culinary haven</span>
      </h3>
      <div style={buttonContainerStyle}>
        <Link to='/tableReservation'>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          // onClick={handleBookTableClick}
        >
          Book a Table
        </button>
        </Link>
        <Link to='/menu'>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          // onClick={handleMenuClick}
        >
          Explore Menu
        </button>
        </Link>
      </div>
        <div style={spacerStyle}  ref={aboutRef}></div>
       <div style={sectionContainerStyle}>
        <div style={aboutSectionStyle}>
          
          <h2>About Us</h2>
          <p>Welcome to our restaurant, a place where culinary excellence meets warm hospitality. Founded in 2020, our mission is to provide an unforgettable dining experience for every guest. We take pride in using only the freshest ingredients to create dishes that are both delicious and visually appealing.</p>
          <p>Our team of experienced chefs brings a wealth of knowledge and passion to the kitchen, ensuring that every meal is prepared to perfection. Whether you're here for a casual lunch, a romantic dinner, or a special celebration, we strive to make every visit memorable.</p>
          <p>Join us and discover a variety of cuisines, from traditional favorites to innovative new creations. We look forward to serving you and making you feel at home in our welcoming culinary haven.</p>
        </div>
      </div>

    

      {/* <div ref={menuRef} style={menuStyle}>
        <h2 style={whatsOnYourMindStyle}>What's on Your Mind?</h2>
        <div style={roundImageContainerStyle}>
          {whatsOnYourMindItems.map((item, index) => (
            <div key={index}>
              <img
                src={item.imageUrl}
                alt={item.itemName}
                style={roundImageStyle}
              />
              <div style={roundImageTitleStyle}>{item.itemName}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Regular Menu section */}
      {/* <div style={menuStyle}> */}
      {/* <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px", // Adjust the gap as needed
            maxWidth: "100%", // Ensures the container takes up the full width of its parent
            width: "94%", // Adjust this value to control how much of the viewport width the container should take
            margin: "0 auto", // Centers the container if it's less than 100% width
            padding: "0 10px", // Optional: Adds some padding around the container
            //  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Background color with transparency
            backgroundColor: "white",
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for depth
          }}
        >
          {menuItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 300, // Minimum width for each card
                maxWidth: 345,
                marginTop: "2rem",
                transition: "transform 0.3s", // Smooth transition for transform changes
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for depth
                "&:hover": {
                  transform: "scale(1.05)", // Increase size by 5%
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:2024/${item.imageUrl}`}
                alt={item.itemName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${item.price}
                </Typography>
                <Button variant="contained" color="primary" size="small">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
      {/* </div> */}
      <footer style={contactInfoStyle} ref={contactRef}>
        <div>
          <h3>Contact Us</h3>
          <p>
            <strong>Ashraf's Restaurant</strong>
          </p>
          <p>124 Busby Road</p>
          <p>Clarkston, Glasgow</p>
          <p>G76 8BG</p>
          <p>Phone: 0141 644 4800</p>
          <p>Email: hello@ashrafs.co.uk</p>
          <p>Operating Hours:</p>
          <p>Monday-Saturday: 16:00  - 22:00 </p>
          
        </div>
        <div>
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/thehungryspoon" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thehungryspoon"
                target="_blank"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Book a Table</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <BookingForm onClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
