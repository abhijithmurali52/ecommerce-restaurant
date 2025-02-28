import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./UserContext";
import "../Css/index.css";
import "../App.css";
import "../Css/img.css";
import Navbar from "./Navbar1";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
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

  //carousal

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <span className="ion-ios-arrow-forward"></span>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <span className="ion-ios-arrow-back"></span>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000, // Slow down the transition speed for a smoother effect
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000, // Adjusted to 5 seconds per slide
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable the navigation arrows
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
    persons: "",
    description: "",
  });
  // Function to generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const times = [];
    let startTime = 6 * 60; // Start time at 6:00 AM (in minutes)
    const endTime = 23 * 60; // End time at 11:00 PM (in minutes)

    while (startTime <= endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const timeString = `${hours % 12 || 12}:${
        minutes === 0 ? "00" : minutes
      } ${hours >= 12 ? "PM" : "AM"}`;
      times.push(timeString);
      startTime += 30; // Increment by 30 minutes
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handler for date change in DatePicker
  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      name: user.username,
      email: user.email,
      phone: user.mobileNo,
      address: user.address,
    };
    try {
      const response = await axios.post(
        "http://localhost:2024/api/bookTable",
        bookingData
      );
      toast.success(response.data.message);
      setFormData({
        date: "",
        time: "",
        persons: 1,
        description: "",
        name: "",
        email: "",
        phone: "",
      });
       // Reload the page after a short delay to allow the toast message to show
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 1-second delay before reload
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div>
      <html>
        <body>
          {/* <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                        <div class="container">
                            <a class="navbar-brand" href="index.html">Ashraf's
                                <span></span>
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="oi oi-menu"></span> Menu
                            </button>

                            <div class="collapse navbar-collapse" id="ftco-nav">
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item active"><a href="index" class="nav-link">Home</a></li>
                                    <li class="nav-item"><a href="about" class="nav-link">About</a></li>
                                    <li class="nav-item"><a href="chef" class="nav-link">Chef</a></li>
                                    <li class="nav-item"><a href="menu" class="nav-link">Menu</a></li>
                                    <li class="nav-item"><a href="reservation" class="nav-link">Reservation</a></li>
                                    <li class="nav-item"><a href="blog" class="nav-link">Blog</a></li>
                                    <li class="nav-item"><a href="contact" class="nav-link">Contact</a></li>
                                    <p><a href="/menu" class="btn btn-primary" style={{ marginTop: " 1.3rem" }}>Order Now</a></p>
                                </ul>
                            </div>
                        </div>
                    </nav> */}
          <Navbar />

          <section className="hero-wrap">
            <Slider {...settings}>
              <div className="slider-item js-fullheight bgNew6">
                <div className="overlay"></div>
                <div className="container">
                  <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                    <div className="col-md-12 ftco-animate">
                      <div className="text w-100 mt-5 text-center">
                        <span
                          style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: "40px",
                            color: "white",
                            fontWeight: "normal",
                            lineHeight: "1",
                            position: "relative",
                            zIndex: "-1",
                          }}
                        >
                          <p style={{ fontSize: "80px", color: "white" }}>
                            Ashraf's Kitchen
                          </p>
                        </span>
                        <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>
                          Restaurant
                        </h1>
                        <span
                          className="subheading-2"
                          style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                          Since 2020
                        </span>
                        <div className="mt-4">
                          <a href="/menu" className="btn btn-primary">
                            Order Now
                          </a>
                          <a
                            href="/reservation"
                            className="btn btn-primary ml-3"
                          >
                            Book a Table
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slider-item js-fullheight bgNew10">
                <div className="overlay"></div>
                <div className="container">
                  <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                    <div className="col-md-12 ftco-animate">
                      <div className="text w-100 mt-5 text-center">
                        <span
                          style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: "40px",
                            color: "white",
                            fontWeight: "normal",
                            lineHeight: "1",
                            position: "relative",
                            zIndex: "-1",
                          }}
                        >
                          <p style={{ fontSize: "80px", color: "white" }}>
                            Ashraf's Kitchen
                          </p>
                        </span>
                        <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>
                          Catering
                        </h1>
                        <span
                          className="subheading-2 sub"
                          style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                          Food
                        </span>
                        <div className="mt-4">
                          <a href="/menu" className="btn btn-primary">
                            Order Now
                          </a>
                          <a
                            href="/reservation"
                            className="btn btn-primary ml-3"
                          >
                            Book a Table
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slider-item js-fullheight bgNew7">
                <div className="overlay"></div>
                <div className="container">
                  <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                    <div className="col-md-12 ftco-animate">
                      <div className="text w-100 mt-5 text-center">
                        <span
                          //  className="subheading"
                          style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: "40px",
                            color: "white",
                            fontWeight: "normal",
                            lineHeight: "1",
                            position: "relative",
                            zIndex: "-1",
                          }}
                        >
                          <p style={{ fontSize: "80px", color: "white" }}>
                            Ashraf's Kitchen
                          </p>
                        </span>
                        <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>
                          Takeaway
                        </h1>
                        <span
                          className="subheading-2 sub"
                          style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                          Food
                        </span>
                        <div className="mt-4">
                          <a href="/menu" className="btn btn-primary">
                            Order Now
                          </a>
                          <a
                            href="/reservation"
                            className="btn btn-primary ml-3"
                          >
                            Book a Table
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </section>

          <section class="ftco-section ftco-wrap-about ftco-no-pb ftco-no-pt">
            <div class="container">
              <div class="row no-gutters">
                <div class="col-sm-4 p-4 p-md-5 d-flex align-items-center justify-content-center bg-primary">
                  <form action="#" class="appointment-form">
                    <h3 class="mb-3">Book your Table</h3>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Name"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Phone"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <div class="input-wrap">
                            <div class="icon">
                              <span class="fa fa-calendar"></span>
                            </div>
                            <DatePicker
                              selected={formData.date}
                              onChange={handleDateChange}
                              className="form-control"
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select a date"
                              required
                              style={{width:"10rem"}}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <div class="input-wrap">
                            <div class="icon">
                              <span class="fa fa-clock-o"></span>
                            </div>
                            <select
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              className="form-control"
                              required
                            >
                              <option value="">Select Time</option>
                              {timeSlots.map((time, index) => (
                                <option
                                  key={index}
                                  value={time}
                                  style={{ color: "black" }}
                                >
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <div class="form-field">
                            <div class="select-wrap">
                              <div class="icon">
                                <span class="fa fa-chevron-down"></span>
                              </div>
                              <select
                                name="persons"
                                value={formData.persons}
                                onChange={handleChange}
                                className="form-control"
                                required
                                style={{ color: "black" }}
                              >
                                <option value="">Guest</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Any additional request or description"
                            rows="4"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="submit"
                            value="Book Your Table Now"
                            class="btn btn-white py-3 px-4"
                            onClick={handleSubmit}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  class="col-sm-8 wrap-about py-5 ftco-animate img"
                  style={{ backgroundImage: `url(${about3})` }}
                >
                  <div class="row pb-5 pb-md-0">
                    <div class="col-md-12 col-lg-7">
                      <div class="heading-section mt-5 mb-4">
                        <div class="pl-lg-3 ml-md-5">
                          <span class="subheading">About Us</span>
                          <h2 class="mb-4">Welcome to Ashraf's</h2>
                        </div>
                      </div>
                      <div class="pl-lg-3 ml-md-5">
                        <p>
                          On her way she met a copy. The copy warned the Little
                          Blind Text, that where it came from it would have been
                          rewritten a thousand times and everything that was
                          left from its origin would be the word "and" and the
                          Little Blind Text should turn around and return to its
                          own, safe country. A small river named Duden flows by
                          their place and supplies it with the necessary
                          regelialia. It is a paradisematic country, in which
                          roasted parts of sentences fly into your mouth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="ftco-section ftco-intro"
            style={{ backgroundImage: `url(${bg_3})` }}
          >
            <div class="overlay"></div>
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <span>Now Booking</span>
                  <h2>Private Dinners &amp; Happy Hours</h2>
                </div>
              </div>
            </div>
          </section>

          <section class="ftco-section">
            <div class="container">
              <div class="row justify-content-center mb-5 pb-2">
                <div class="col-md-7 text-center heading-section ftco-animate">
                  <span class="subheading">Specialties</span>
                  <h2 class="mb-4">Our Menu</h2>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-lg-4">
                  <div class="menu-wrap">
                    <div class="heading-menu text-center ftco-animate">
                      <h3>Breakfast</h3>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${breakfast_1})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${breakfast_2})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus border-bottom-0 d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${breakfast_3})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="flat flaticon-bread"
                      style={{ left: "0" }}
                    ></span>
                    <span
                      class="flat flaticon-breakfast"
                      style={{ right: "0" }}
                    ></span>
                  </div>
                </div>

                <div class="col-md-6 col-lg-4">
                  <div class="menu-wrap">
                    <div class="heading-menu text-center ftco-animate">
                      <h3>Lunch</h3>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${lunch_1})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${lunch_2})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus border-bottom-0 d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${lunch_3})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="flat flaticon-pizza"
                      style={{ left: "0" }}
                    ></span>
                    <span
                      class="flat flaticon-chicken"
                      style={{ right: "0" }}
                    ></span>
                  </div>
                </div>

                <div class="col-md-6 col-lg-4">
                  <div class="menu-wrap">
                    <div class="heading-menu text-center ftco-animate">
                      <h3>Dinner</h3>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${dinner_1})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${dinner_2})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus border-bottom-0 d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${dinner_3})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="flat flaticon-omelette"
                      style={{ left: "0" }}
                    ></span>
                    <span
                      class="flat flaticon-burger"
                      style={{ right: "0" }}
                    ></span>
                  </div>
                </div>

                <div class="col-md-6 col-lg-4">
                  <div class="menu-wrap">
                    <div class="heading-menu text-center ftco-animate">
                      <h3>Desserts</h3>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${dessert_1})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${dessert_2})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus border-bottom-0 d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${dessert_3})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="flat flaticon-cupcake"
                      style={{ left: "0" }}
                    ></span>
                    <span
                      class="flat flaticon-ice-cream"
                      style={{ right: "0" }}
                    ></span>
                  </div>
                </div>

                <div class="col-md-6 col-lg-4">
                  <div class="menu-wrap">
                    <div class="heading-menu text-center ftco-animate">
                      <h3>Wine Card</h3>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${wine_1})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${wine_2})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus border-bottom-0 d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${wine_3})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="flat flaticon-wine"
                      style={{ left: "0" }}
                    ></span>
                    <span
                      class="flat flaticon-wine-1"
                      style={{ right: "0" }}
                    ></span>
                  </div>
                </div>

                <div class="col-md-6 col-lg-4">
                  <div class="menu-wrap">
                    <div class="heading-menu text-center ftco-animate">
                      <h3>Drinks &amp; Tea</h3>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${drink_1})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${drink_2})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <div class="menus border-bottom-0 d-flex ftco-animate">
                      <div
                        class="menu-img img"
                        style={{ backgroundImage: `url(${drink_3})` }}
                      ></div>
                      <div class="text">
                        <div class="d-flex">
                          <div class="one-half">
                            <h3>Beef Roast Source</h3>
                          </div>
                          <div class="one-forth">
                            <span class="price">$29</span>
                          </div>
                        </div>
                        <p>
                          <span>Meat</span>, <span>Potatoes</span>,{" "}
                          <span>Rice</span>, <span>Tomatoe</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="flat flaticon-wine"
                      style={{ left: "0" }}
                    ></span>
                    <span
                      class="flat flaticon-wine-1"
                      style={{ right: "0" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="ftco-section ftco-no-pt ftco-no-pb">
            <div class="container">
              <div class="row d-flex">
                <div class="col-md-6 d-flex">
                  <div
                    class="img img-2 w-100 mr-md-2"
                    style={{ backgroundImage: `url(${bg_6})` }}
                  ></div>
                  <div
                    class="img img-2 w-100 ml-md-2"
                    style={{ backgroundImage: `url(${bg_4})` }}
                  ></div>
                </div>
                <div class="col-md-6 ftco-animate makereservation p-4 p-md-5">
                  <div class="heading-section ftco-animate mb-5">
                    <span class="subheading">This is our secrets</span>
                    <h2 class="mb-4">Perfect Ingredients</h2>
                    <p>
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics, a large language ocean.
                    </p>
                    <p>
                      <a href="#" class="btn btn-primary">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="ftco-section bg-light">
            <div class="container">
              <div class="row justify-content-center mb-5 pb-2">
                <div class="col-md-7 text-center heading-section ftco-animate">
                  <span class="subheading">Blog</span>
                  <h2 class="mb-4">Recent Blog</h2>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 ftco-animate">
                  <div class="blog-entry">
                    <a
                      href="blog-single.html"
                      class="block-20"
                      style={{ backgroundImage: `url(${image_1})` }}
                    ></a>
                    <div class="text px-4 pt-3 pb-4">
                      <div class="meta">
                        <div>
                          <a href="#">August 3, 2020</a>
                        </div>
                        <div>
                          <a href="#">Admin</a>
                        </div>
                      </div>
                      <h3 class="heading">
                        <a href="#">
                          Even the all-powerful Pointing has no control about
                          the blind texts
                        </a>
                      </h3>
                      <p class="clearfix">
                        <a href="#" class="float-left read btn btn-primary">
                          Read more
                        </a>
                        <a href="#" class="float-right meta-chat">
                          <span class="fa fa-comment"></span> 3
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 ftco-animate">
                  <div class="blog-entry">
                    <a
                      href="blog-single.html"
                      class="block-20"
                      style={{ backgroundImage: `url(${image_2})` }}
                    ></a>
                    <div class="text px-4 pt-3 pb-4">
                      <div class="meta">
                        <div>
                          <a href="#">August 3, 2020</a>
                        </div>
                        <div>
                          <a href="#">Admin</a>
                        </div>
                      </div>
                      <h3 class="heading">
                        <a href="#">
                          Even the all-powerful Pointing has no control about
                          the blind texts
                        </a>
                      </h3>
                      <p class="clearfix">
                        <a href="#" class="float-left read btn btn-primary">
                          Read more
                        </a>
                        <a href="#" class="float-right meta-chat">
                          <span class="fa fa-comment"></span> 3
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 ftco-animate">
                  <div class="blog-entry">
                    <a
                      href="blog-single.html"
                      class="block-20"
                      style={{ backgroundImage: `url(${image_3})` }}
                    ></a>
                    <div class="text px-4 pt-3 pb-4">
                      <div class="meta">
                        <div>
                          <a href="#">August 3, 2020</a>
                        </div>
                        <div>
                          <a href="#">Admin</a>
                        </div>
                      </div>
                      <h3 class="heading">
                        <a href="#">
                          Even the all-powerful Pointing has no control about
                          the blind texts
                        </a>
                      </h3>
                      <p class="clearfix">
                        <a href="#" class="float-left read btn btn-primary">
                          Read more
                        </a>
                        <a href="#" class="float-right meta-chat">
                          <span class="fa fa-comment"></span> 3
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="ftco-section ftco-no-pt ftco-no-pb ftco-intro bg-primary">
            <div class="container py-5">
              <div class="row py-2">
                <div class="col-md-12 text-center">
                  <h2>We Make Delicious &amp; Nutritious Food</h2>
                  <a href="#" class="btn btn-white btn-outline-white">
                    Book A Table Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div id="ftco-loader" class="show fullscreen">
            <svg class="circular" width="48px" height="48px">
              <circle
                class="path-bg"
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke-width="4"
                stroke="#eeeeee"
              />
              <circle
                class="path"
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke-width="4"
                stroke-miterlimit="10"
                stroke="#F96D00"
              />
            </svg>
          </div>
        </body>
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
      </html>
      <ToastContainer />
    </div>
  );
}

export default Home;
