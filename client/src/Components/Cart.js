import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar1";
import Contact from "./Contact";
import Loader from "react-loader-spinner";
import { Puff } from "react-loader-spinner";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactModal from "react-modal";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faTrash } from "@fortawesome/free-solid-svg-icons";
import bgNew6 from "../images/bgNew6.jpg";
import bgNew10 from "../images/bgNew10.jpg";
import bgNew7 from "../images/bgNew7.jpg";
import about3 from "../images/about3.jpg";
import bg_6 from "../images/bg_6.jpg";
import bg_5 from "../images/bg_5.jpg";
import bg_4 from "../images/bg_4.jpg";
import bg_3 from "../images/bg_3.jpg";
import bg_2 from "../images/bg_2.jpg";
import bg_1 from "../images/bg_1.jpg";
import image_1 from "../images/image_1.jpg";
import image_2 from "../images/image_2.jpg";
import image_3 from "../images/image_3.jpg";
import breakfast_1 from "../images/breakfast-1.jpg";
import breakfast_2 from "../images/breakfast-2.jpg";
import breakfast_3 from "../images/breakfast-3.jpg";
import drink_1 from "../images/drink-1.jpg";
import drink_2 from "../images/drink-2.jpg";
import drink_3 from "../images/drink-3.jpg";
import lunch_1 from "../images/lunch-1.jpg";
import lunch_2 from "../images/lunch-2.jpg";
import lunch_3 from "../images/lunch-3.jpg";
import dinner_1 from "../images/dinner-1.jpg";
import dinner_2 from "../images/dinner-2.jpg";
import dinner_3 from "../images/dinner-3.jpg";
import dessert_1 from "../images/dessert-1.jpg";
import dessert_2 from "../images/dessert-2.jpg";
import dessert_3 from "../images/dessert-3.jpg";
import wine_1 from "../images/wine-1.jpg";
import wine_2 from "../images/wine-2.jpg";
import wine_3 from "../images/wine-3.jpg";
import insta1 from "../images/insta-1.jpg";
import insta2 from "../images/insta-2.jpg";
import insta3 from "../images/insta-3.jpg";
import insta4 from "../images/insta-4.jpg";
import insta5 from "../images/insta-5.jpg";
import insta6 from "../images/insta-6.jpg";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";


const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const { updateCartItemCount } = useContext(CartContext);
  const { user } = useContext(UserContext);
  console.log("user", user);

  useEffect(() => {
    if (cart && cart.items) {
      let total = 0;
      cart.items.forEach((item) => {
        if (item.item && item.item.price) {
          total += item.quantity * item.item.price;
        }
      });
      setTotalAmount(total);
    }
  }, [cart]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("http://localhost:2024/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cart data",response.data)
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  
 

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.put(
        `http://localhost:2024/api/cartQuantity/${itemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data); // Update cart with the modified item quantity
      fetchCart();
      // Update the cart item count in the context
      let itemCount = 0;
      response.data.items.forEach((item) => {
        itemCount += item.quantity;
      });
      updateCartItemCount(itemCount);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  useEffect(() => {
    handleQuantityChange();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.delete(
        `http://localhost:2024/api/cartRemove/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data); // Update cart after removing the item

      // if (window.confirm('Item removed from cart successfully!')) {
      //     fetchCart(); // Re-fetch the cart items
      // }
      toast.success("Item removed from cart successfully!");
      fetchCart();
      if (response.status === 200) {
        setCart(response.data);
        let itemCount = 0;
        response.data.items.forEach((item) => {
          itemCount += item.quantity;
        });
        updateCartItemCount(itemCount);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleIncrement = (itemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(itemId, newQuantity);
  };

  const handleDecrement = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      handleQuantityChange(itemId, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  //   if (!cart || !cart.items || cart.items.length === 0) {
  //     return (
  //       <div className="empty-cart">
  //         <h2>Your Cart is Empty</h2>
  //         <p>Add some delicious items!</p>
  //         <Link to="/menu" className="cart-button">
  //           View Menu
  //         </Link>
  //       </div>
  //     );
  //   }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handleOrder = async () => {
    try {
      if (!user) {
        alert("You must be logged in to place an order.");
        return;
      }

      const token = localStorage.getItem("token"); // Adjust this based on how you store the token
      if (!token) {
        alert("No authentication token found.");
        return;
      }

      const orderData = {
        userId: user._id, // Assuming user._id is a valid ObjectId
        items: cart.items.map((item) => ({
          itemId: item.itemId,
          itemName: item.itemName,
          imageUrl: item.imageUrl,
          price: item.price,
        })),
        totalAmount: totalAmount,
      };

      const response = await fetch("http://localhost:2024/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");

        // Optionally, clear the cart or redirect the user
        closeModal();
        // Clear cart data from state
        setCart({ items: [], totalAmount: 0 });
        await fetchCart();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to place order: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    }
  };

 

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h2 className="heading">Your Cart</h2>
        <ul className="cart-items">
          {cart && cart.items && cart.items.length > 0 ? (
            cart.items.map((item, index) => {
              const { item: cartItem, quantity } = item;
              const itemName = cartItem ? cartItem.itemName : "Unknown Item";
              const imageUrl = cartItem ? cartItem.imageUrl : "";
              const price =
                cartItem && cartItem.price ? cartItem.price.toFixed(2) : "N/A";
              const totalPrice =
                cartItem && cartItem.price
                  ? (quantity * cartItem.price).toFixed(2)
                  : "N/A";

              return (
                <li key={index} className="cart-item">
                  <img
                    src={imageUrl}
                    alt={itemName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{itemName}</h3>
                    <p>Price per item: ${price}</p>
                    <div className="quantity-controls">
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleDecrement(cartItem.itemId, quantity)
                        }
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleIncrement(cartItem.itemId, quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    <p>Total Price: ${totalPrice}</p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveFromCart(cartItem.itemId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="empty-cart">
              <h2>Your Cart is Empty</h2>
              <p>Add some delicious items!</p>
              <Link to="/menu" className="cart-button">
                View Menu
              </Link>
            </div>
          )}
        </ul>

        {cart && cart.items && cart.items.length > 0 && (
          <div className="cart-total">
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
        )}

        <div className="cart-buttons">
          <div className="left-buttons">
            <Link to="/menu" className="cart-button">
              Back to Menu
            </Link>
            <Link to="/orderhistory" className="cart-button history-button">
              <FontAwesomeIcon icon={faHistory} />
              History
            </Link>
          </div>
          <button className="cart-button" onClick={openModal}>
            Proceed
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {step === 1 && (
              <>
                <Row>
                  <Col md={6}>
                    <div className="user-details-section">
                      <h5>User Details</h5>
                      <hr />
                      <p>
                        <strong>Name:</strong> {user.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Mobile Number:</strong> {user.mobileNo}
                      </p>
                      <p>
                        <strong>Address:</strong> {user.address}
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="item-details-section">
                      <h5>Item Details</h5>
                      {cart &&
                        cart.items &&
                        cart.items.map((item, index) => (
                          <div key={index} className="item">
                            <p>
                              <strong>Item Name:</strong> {item.item.itemName}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
                            <p>
                              <strong>Price:</strong> ${item.item.price}
                            </p>
                          </div>
                        ))}

                      <p className="total-amount">
                        <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={closeModal}
                      className="mt-4"
                      style={{ marginRight: "15px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleProceedToPayment}
                      className="mt-4"
                    >
                      Proceed to Payment
                    </Button>
                  </Col>
                </Row>
              </>
            )}
            {step === 2 && (
              <>
                {/* Payment method section */}
                <Row>
                  <Col>
                    <div className="payment-method-section">
                      <h5>Payment Method</h5>
                      <Form>
                        <Form.Group>
                          <Form.Label>Select Payment Method:</Form.Label>
                          <Form.Control
                            as="select"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                          >
                            <option value="creditCard">Credit Card</option>
                            <option value="upi">UPI</option>
                            <option value="cashOnDelivery">
                              Cash on Delivery
                            </option>
                          </Form.Control>
                        </Form.Group>
                        {paymentMethod === "creditCard" && (
                          <div className="credit-card-details">
                            <Form.Group>
                              <Form.Label>Card Number:</Form.Label>
                              <Form.Control
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handlePaymentDetailsChange}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Expiry Date:</Form.Label>
                              <Form.Control
                                type="text"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handlePaymentDetailsChange}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>CVV:</Form.Label>
                              <Form.Control
                                type="text"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handlePaymentDetailsChange}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Card Holder Name:</Form.Label>
                              <Form.Control
                                type="text"
                                name="cardHolderName"
                                value={paymentDetails.cardHolderName}
                                onChange={handlePaymentDetailsChange}
                              />
                            </Form.Group>
                          </div>
                        )}
                      </Form>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={handleBackToStep1}
                      style={{ marginRight: "15px" }}
                    >
                      Back
                    </Button>
                    <Button variant="primary" onClick={handleOrder}>
                      Confirm and Pay
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </Modal.Body>
      </Modal>
      <footer className="ftco-footer ftco-no-pb ftco-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-6 col-lg-3">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Ashraf's</h2>
                  <p>Far far away, behind the word mountains...</p>
                  <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                    <li className="ftco-animate">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        style={{ color: "#bd1212", fontSize: "24px" }}
                      />
                    </li>
                    <li className="ftco-animate">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        style={{ color: "#bd1212", fontSize: "24px" }}
                      />
                    </li>
                    <li className="ftco-animate">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ color: "#bd1212", fontSize: "24px" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Open Hours</h2>
                  <ul className="list-unstyled open-hours">
                    <li className="d-flex">
                      <span>Monday</span>
                      <span>9:00 - 24:00</span>
                    </li>
                    <li className="d-flex">
                      <span>Tuesday</span>
                      <span>9:00 - 24:00</span>
                    </li>
                    <li className="d-flex">
                      <span>Wednesday</span>
                      <span>9:00 - 24:00</span>
                    </li>
                    <li className="d-flex">
                      <span>Thursday</span>
                      <span>9:00 - 24:00</span>
                    </li>
                    <li className="d-flex">
                      <span>Friday</span>
                      <span>9:00 - 02:00</span>
                    </li>
                    <li className="d-flex">
                      <span>Saturday</span>
                      <span>9:00 - 02:00</span>
                    </li>
                    <li className="d-flex">
                      <span>Sunday</span>
                      <span> Closed</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Instagram</h2>
                  <div className="thumb d-sm-flex">
                    <a
                      href="#"
                      className="thumb-menu img"
                      style={{ backgroundImage: `url(${insta1})` }}
                    ></a>
                    <a
                      href="#"
                      className="thumb-menu img"
                      style={{ backgroundImage: `url(${insta2})` }}
                    ></a>
                    <a
                      href="#"
                      className="thumb-menu img"
                      style={{ backgroundImage: `url(${insta3})` }}
                    ></a>
                  </div>
                  <div className="thumb d-flex">
                    <a
                      href="#"
                      className="thumb-menu img"
                      style={{ backgroundImage: `url(${insta4})` }}
                    ></a>
                    <a
                      href="#"
                      className="thumb-menu img"
                      style={{ backgroundImage: `url(${insta5})` }}
                    ></a>
                    <a
                      href="#"
                      className="thumb-menu img"
                      style={{ backgroundImage: `url(${insta6})` }}
                    ></a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Newsletter</h2>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries.
                  </p>
                  <form action="#" className="subscribe-form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control mb-2 text-center"
                        placeholder="Enter email address"
                      />
                      <input
                        type="submit"
                        value="Subscribe"
                        className="form-control submit px-3"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </footer>

      <ToastContainer />
    </div>
  );
};

export default Cart;
