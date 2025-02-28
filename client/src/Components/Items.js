import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  Form,
  Card,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import "../Items.css";
const MySwal = withReactContent(Swal);

const Items = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const compressImage = (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
              );
            },
            file.type,
            quality
          );
        };
        img.onerror = (err) => {
          reject(err);
        };
        img.src = event.target.result;
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("itemName", formData.itemName);
    formDataObj.append("price", formData.price);
    // formDataObj.append('image', formData.image);
    formDataObj.append("category", formData.category);
    formDataObj.append("description", formData.description);

    // Compress and append image to FormData if it exists
    if (formData.image) {
      const compressedImage = await compressImage(
        formData.image,
        800,
        800,
        0.9
      );
      formDataObj.append("image", compressedImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:2024/api/items",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Item created:", response.data);
      // Update local state with the new item
      setItems((prevItems) => [...prevItems, response.data]);
      
      MySwal.fire({
        title: "Success!",
        text: "Item added successfully!",
        icon: "success",
      });
      fetchItems();
      // // Optionally add the new item to the menu immediately
      // setMenuItems(prevMenuItems => [...prevMenuItems, response.data]);
      handleClose();
    } catch (error) {
      console.error("Error creating item:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to add item",
        icon: "error",
      });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleCloseCategoryModal = () => setShowCategoryModal(false);
  const handleShowCategoryModal = () => setShowCategoryModal(true);

  const [items, setItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState({
    itemName: "",
    category: "",
    price: "",
    imageUrl: "",
  });
  const [categoryData, setCategoryData] = useState({
    category: "",
  });

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [itemId, setItemId] = useState("");
  const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/item-categories"
        );
        setCategory(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching items");
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchCategory();
  }, []);

  
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/items");
        const itemsWithUrls = response.data.map((item) => {
          // Create a URL for the image using the item ID
          const imageUrl = `http://localhost:2024/api/images/${item._id}`;
          return { ...item, imageUrl };
        });
        setItems(itemsWithUrls);
        setLoading(false);
        const menuItemsResponse = await axios.get(
          "http://localhost:2024/api/menuItems"
        );
        setMenuItems(menuItemsResponse.data);
      } catch (error) {
        setError("Error fetching items");
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // const handleAddToMenu = async (item) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:2024/api/addItemMenu",
  //       item
  //     );
  //     if (response.status === 201) {
  //       // alert('Item added to menu successfully!');
  //       MySwal.fire({
  //         title: "Success!",
  //         text: "Item added successfully!",
  //         icon: "success",
  //       });
  //       // Optionally, update local state or fetch updated items list
  //       setMenuItems((prevMenuItems) => [...prevMenuItems, item]); // Update local state with the new menu item
  //     } else {
  //       alert("Unexpected response status: " + response.status);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       // alert(error.response.data.message);
  //       MySwal.fire({
  //         title: "Error!",
  //         text: error.response.data.message,
  //         icon: "error",
  //       });
  //     } else {
  //       console.error("Error adding item to menu:", error);
  //       // alert('Failed to add item to menu');
  //       MySwal.fire({
  //         title: "Error!",
  //         text: "Failed to add item to menu",
  //         icon: "error",
  //       });
  //     }
  //   }
  // };
//   const handleAddToMenu = async (item) => {
//   const formData = new FormData();
//   formData.append('itemName', item.itemName);
//   formData.append('itemId', item.itemId);
//   formData.append('price', item.price);
//   formData.append('category', item.category);
//   formData.append('description', item.description);
//   formData.append('image', item.imageFile); // Assuming item.imageFile is the File object

//   try {
//     const response = await axios.post("http://localhost:2024/api/addItemMenu", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     if (response.status === 201) {
//       MySwal.fire({
//         title: "Success!",
//         text: "Item added successfully!",
//         icon: "success",
//       });
//       setMenuItems((prevMenuItems) => [...prevMenuItems, response.data]); // Update local state with the new menu item
//     } else {
//       alert("Unexpected response status: " + response.status);
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 400) {
//       MySwal.fire({
//         title: "Error!",
//         text: error.response.data.message,
//         icon: "error",
//       });
//     } else {
//       console.error("Error adding item to menu:", error);
//       MySwal.fire({
//         title: "Error!",
//         text: "Failed to add item to menu",
//         icon: "error",
//       });
//     }
//   }
// };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Assuming items are stored with their custom itemId
  // const handleRemoveFromMenu = async (itemId) => {
  //   try {
  //     console.log(`Attempting to remove item with itemId: ${itemId}`); // Log the itemId being passed

  //     const response = await axios.delete(
  //       `http://localhost:2024/api/removeItemMenu/${itemId}`
  //     );

  //     if (response.status === 200) {
  //       // alert('Item removed from menu successfully!');
  //       MySwal.fire({
  //         title: "Success!",
  //         text: "Item removed from menu successfully!",
  //         icon: "success",
  //       });
  //       setMenuItems((prevMenuItems) =>
  //         prevMenuItems.filter((item) => item.itemId !== itemId)
  //       ); // Update local state to remove the item
  //     } else if (response.status === 404) {
  //       // alert('Item not found');
  //       MySwal.fire({
  //         title: "Error!",
  //         text: "Item not found",
  //         icon: "error",
  //       });
  //     } else {
  //       throw new Error("Failed to remove item from menu");
  //     }
  //   } catch (error) {
  //     console.error("Error removing item:", error);
  //     // alert('Failed to remove item from menu');
  //     MySwal.fire({
  //       title: "Error!",
  //       text: "Failed to remove item from menu",
  //       icon: "error",
  //     });
  //   }
  // };
  const handleAddToMenu = async (item) => {
    try {
      const response = await axios.put(`http://localhost:2024/api/menu/${item.itemId}/status`, {
        status: 'active'
      });
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemId === item.itemId ? { ...prevItem, status: 'active' } : prevItem
        )
      );
      setMenuItems((prevMenuItems) => [...prevMenuItems, response.data]);
    } catch (error) {
      console.error('Error adding item to menu:', error);
    }
  };

  const handleRemoveFromMenu = async (itemId) => {
    try {
      await axios.put(`http://localhost:2024/api/menu/${itemId}/status`, {
        status: 'inactive'
      });
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemId === itemId ? { ...prevItem, status: 'inactive' } : prevItem
        )
      );
      setMenuItems((prevMenuItems) =>
        prevMenuItems.filter((menuItem) => menuItem.itemId !== itemId)
      );
    } catch (error) {
      console.error('Error removing item from menu:', error);
    }
  };


  // Function to handle card click and show modal with item details
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditedItem({
      itemName: item.itemName,
      price: item.price,
      imageUrl: item.imageUrl,
    });
    setShowModal(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  // Function to handle file input change for image reselection
  const handleImageReselect = (e) => {
    setEditedItem({ ...editedItem, newImageFile: e.target.files[0] });
  };

  // Function to handle form submission for item editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("price", price);
      if (image) {
        formData.append("image", image);
      }
      formData.append("_id", items._id); // Assuming item._id is the MongoDB _id

      const response = await axios.put(
        `http://localhost:2024/api/items/${items._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Item updated:", response.data);
      setLoading(false);
      // Optionally handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error updating item:", error);
      setLoading(false);
      if (error.response) {
        // Handle error response
      } else if (error.request) {
        // Handle no response
      } else {
        // Handle request setup error
      }
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setEditedItem({
      itemName: "",
      price: "",
      imageUrl: "",
    });
    setShowModal(false);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    // Submit the item category first
    try {
      await axios.post(
        "http://localhost:2024/api/item-categories",
        categoryData
      );
      console.log("Category created successfully.");
      // alert('Item not found');
      MySwal.fire({
        title: "Success!",
        text: "Category added successfully!",
        icon: "success",
      });
      handleCloseCategoryModal();
      fetchCategory();
    } catch (error) {
      console.error("Error creating category:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to remove item from menu",
        icon: "error",
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar show={sidebarOpen} onHide={handleSidebarToggle} />
      <div
        className={`sidebar-toggle ${sidebarOpen ? "open" : "closed"}`}
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </div>
      <div
        className={`main-content ${
          sidebarOpen ? "with-sidebar" : "without-sidebar"
        }`}
      >
        <div className="heading-class">
          <h2>ITEMS</h2>
          <Button className="plus-button" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <Container>
          <h2 className="text-center my-4">Items List</h2>
          <Row>
            {items.map((item) => {
              const isInMenu = menuItems.some(
                (menuItem) => menuItem.itemId === item.itemId
              );
              return (
                <Col
                  key={item._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Card
                    className="item-card h-100"
                    //  onClick={() => handleEditClick(item)}
                  >
                    <Card.Img
                      variant="top"
                      src={item.imageUrl}
                      className="card-image"
                    />
                    <Card.Body>
                      <Card.Title>{item.itemName}</Card.Title>
                      <Card.Text style={{ fontSize: "1rem" }}>
                        <strong>Item Id:</strong> {item.itemId}
                        <br />
                        <strong>Price:</strong> ${item.price}
                      </Card.Text>
                      {isInMenu && (
                        <div style={{ color: "green", fontWeight: "bold" }}>
                          In Menu
                        </div>
                      )}
                      <div>
                        <Button
                          className="add-button"
                          onClick={() => handleAddToMenu(item)}
                          disabled={isInMenu}
                        >
                          {isInMenu ? "Already in Menu" : "Add to Menu"}
                        </Button>
                        {isInMenu && (
                          <Button
                            variant="secondary"
                            className="remove-button"
                            onClick={() => handleRemoveFromMenu(item.itemId)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item name"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      as="select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mb-3"
                    >
                      <option value="">Select a category</option>
                      {category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.category}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex align-items-center"
                    style={{ marginTop: "-20px" }}
                  >
                    <Button onClick={handleShowCategoryModal}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mb-3"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/*category modal*/}

        <Modal
          show={showCategoryModal}
          onHide={handleCloseCategoryModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Item Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="itemCategoryName">
                <Form.Label>Item Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={categoryData.category}
                  onChange={handleCategoryChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCategoryModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCategorySubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal to edit item details */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={editedItem.itemName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editedItem.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Row>
                  <Col xs={6}>
                    <img
                      src={`http://localhost:2024/${editedItem.imageUrl}`}
                      alt="Current Item Image"
                      className="img-fluid"
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Control
                      type="file"
                      name="newImageFile"
                      onChange={handleImageReselect}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Items;
