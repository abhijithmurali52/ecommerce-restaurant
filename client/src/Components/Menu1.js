import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import {  Dialog, DialogTitle, DialogContent, DialogActions, TextField,Checkbox, FormControlLabel } from "@mui/material";
import "./Menu.css"; // Assuming you have a Menu.css for styling
import Navbar from "./Navbar1";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./Contact";
import { CartContext } from './CartContext';
import NavbarIcons from "./NavbarIcons";


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const { updateCartItemCount } = useContext(CartContext);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
 // State for managing preparation instructions dialog
 const [openDialog, setOpenDialog] = useState(false);
 const [preparationInstructions, setPreparationInstructions] = useState("");
 const [itemToAdd, setItemToAdd] = useState(null);
 const [selectedAddOns, setSelectedAddOns] = useState([]); // State for selected add-ons
 const [otherAddOn, setOtherAddOn] = useState(""); // State for custom add-on

  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:2024/api/menuItems");
  //       setMenuItems(response.data);
  //       setLoading(false);
      
  //     } catch (error) {
  //       setError("Error fetching items");
  //       setLoading(false);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);


  // Add-on options
  const addOnOptions = [
    { name: "Fries", price: 2 },
    { name: "Salad", price: 3 },
    { name: "Drink", price: 1.5 },
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/menuItems");
        const itemsWithUrls = response.data.map((item) => {
          // Create a URL for the image using the item ID
          const imageUrl = `http://localhost:2024/api/menuImage/${item._id}`;
          return { ...item, imageUrl };
        });
        setMenuItems(itemsWithUrls);
        setLoading(false);
      } catch (error) {
        setError("Error fetching items");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);


  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  // Handle Add to Cart button click - open portion selection dialog
  const handleAddToCart = (itemId) => {
    if (!user) {
      navigate("/login");
    } else {
      setItemToAdd(itemId); // Temporarily store the item to add
      setOpenDialog(true);  // Open the dialog for portion selection
    }
  };


  // Confirm portion and add item to cart
  const confirmAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post(
        "http://localhost:2024/api/cart/add",
        {
          itemId: itemToAdd,
          quantity: 1,
          preparation: preparationInstructions, // Send the selected portion size
          addOns: selectedAddOns, // Send the selected add-ons to backend
          otherAddOn, // Send the custom add-on to backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update cart item count
      let itemCount = 0;
      response.data.items.forEach((item) => {
        itemCount += item.quantity;
      });
      updateCartItemCount(itemCount);
      // Show success toast notification
      toast.success("Item added to cart");
      // Reset dialog states
      setOpenDialog(false);
      setPreparationInstructions("");  
      setSelectedAddOns([]);
      setOtherAddOn("");
      } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again later.");
    }
  };

   // Handle add-on selection
   const handleAddOnChange = (addOnName) => {
    if (selectedAddOns.includes(addOnName)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== addOnName)); // Remove if already selected
    } else {
      setSelectedAddOns([...selectedAddOns, addOnName]); // Add if not selected
    }
  };

  // Function to split description into chunks
  const splitDescription = (description, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < description.length; i += chunkSize) {
      chunks.push(description.slice(i, i + chunkSize));
    }
    return chunks.join("\n"); // Join chunks with newline character
  };

  // Get unique categories from menuItems
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  // Filter menuItems based on selected category
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      {/* <NavbarIcons/> */}
    <div className="menu-container">
      
      
      <div className="menu">
        {/* <h2 className="text-center custom-heading">Explore Our Culinary Creations</h2> */}
        {/* Navigation tabs */}
        <div className="tabs-container">
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          centered
          variant="scrollable"
          scrollButtons="auto"
          aria-label="menu categories"
          style={{ marginBottom: "30px" }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} value={category} />
          ))}
        </Tabs>
        </div>
        <Grid container spacing={2} justifyContent="center">
          {filteredMenuItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={6} lg={6}>
              <Card
                sx={{
                  display: "flex",
                  maxWidth: 600,
                  margin: "auto",
                  marginRight: "5rem",
                  marginLeft: "5rem",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                  image={item.imageUrl}
                  alt={item.itemName}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    {item.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {splitDescription(item.description, 40)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Button
                    onClick={() => handleAddToCart(item.itemId)}
                    variant="contained"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
{/* Preparation instructions dialog */}
   {/* Larger Preparation Instructions Dialog */}
    {/* Larger Preparation Instructions Dialog with Add-ons */}
    <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" // Set maximum width to medium
        fullWidth // Make the dialog take the full width
        PaperProps={{ style: { padding: "20px" } }} // Add more padding
      >
        <DialogTitle style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
          Special Preparation Request & Add-ons
        </DialogTitle>
        <DialogContent>
          {/* Preparation Instructions */}
          <TextField
            fullWidth
            multiline
            minRows={4} // Make the input box larger
            label="Enter Instructions (e.g., Extra Spicy, No Garlic, Well-Done)"
            value={preparationInstructions}
            onChange={(e) => setPreparationInstructions(e.target.value)}
            InputProps={{
              style: { fontSize: "1.2rem" }, // Increase font size of input
            }}
            style={{ marginTop: "20px" }} // Add some spacing around the input
          />

          {/* Add-ons Section */}
          <div style={{ marginTop: "30px" }}>
            <h4>Select Add-ons</h4>
            {addOnOptions.map((addOn) => (
              <FormControlLabel
                key={addOn.name}
                control={
                  <Checkbox
                    checked={selectedAddOns.includes(addOn.name)}
                    onChange={() => handleAddOnChange(addOn.name)}
                  />
                }
                label={`${addOn.name} (+$${addOn.price})`}
                style={{ marginRight: "20px" }}
              />
            ))}
          </div>

          {/* Custom Add-on Section */}
          <TextField
            fullWidth
            label="Other Add-ons (Specify if not listed)"
            value={otherAddOn}
            onChange={(e) => setOtherAddOn(e.target.value)}
            InputProps={{
              style: { fontSize: "1.2rem" }, // Increase font size of input
            }}
            style={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)} 
            color="secondary" 
            style={{ fontSize: "1rem" }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmAddToCart} 
            color="primary" 
            variant="contained" 
            style={{ fontSize: "1rem" }}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    
      <ToastContainer />
    </div>
    </div>
  );
};

export default Menu;
