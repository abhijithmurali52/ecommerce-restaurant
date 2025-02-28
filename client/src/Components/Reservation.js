import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg_5 from "../images/bg_5.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar1";

const Reservation = () => {
  const { user } = useContext(UserContext);
  const [step, setStep] = useState(1);
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
      toast.error(error.response.data.message);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  // Handler for the Back button
  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      <Navbar />
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
                                    <li class="nav-item active"><a href="/" class="nav-link">Home</a></li>
                                    <li class="nav-item"><a href="about" class="nav-link">About</a></li>
                                    <li class="nav-item"><a href="chef" class="nav-link">Chef</a></li>
                                    <li class="nav-item"><a href="menu" class="nav-link">Menu</a></li>
                                    <li class="nav-item"><a href="reservation" class="nav-link">Reservation</a></li>
                                    <li class="nav-item"><a href="blog" class="nav-link">Blog</a></li>
                                    <li class="nav-item"><a href="contact" class="nav-link">Contact</a></li>
                                    <p><a href="#" class="btn btn-primary" style={{ marginTop: " 1.3rem" }}>Order Now</a></p>
                                </ul>
                            </div>
                        </div>
                    </nav> */}

      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: `url(${bg_5})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end justify-content-center">
            <div className="col-md-9  text-center mb-5">
              <h1 className="mb-2 bread">Book A Table Now</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link to="/">
                    Home <i className="fa fa-chevron-right"></i>
                  </Link>
                </span>
                <span>
                  Reservation <i className="fa fa-chevron-right"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-wrap-about ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-sm-12 p-4 p-md-5 d-flex align-items-center justify-content-center bg-primary">
              <form onSubmit={handleSubmit} className="appointment-form">
                <h3 className="mb-3">Book your Table</h3>
                <div className="row justify-content-center">
                  {step === 1 && (
                    <>
                      {/* Initial Form Fields */}
                      <div className="col-md-4">
                        <div className="form-group">
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
                      <div className="col-md-4">
                        <div className="form-group">
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
                      <div className="col-md-4">
                        <div className="form-group">
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
                      <div className="col-md-4">
                        <div className="form-group">
                          {/* <label>Check-In Date</label> */}
                          <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            className="form-control custom-datepicker"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          {/* <label>Select Time</label> */}
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="form-field">
                            <div className="select-wrap">
                              <div className="icon">
                                <span className="fa fa-chevron-down"></span>
                              </div>
                              <select
                                name="persons"
                                value={formData.persons}
                                onChange={handleChange}
                                className="form-control"
                                required
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="btn btn-white py-3 px-4"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {/* Description Input */}
                      <div className="col-md-8">
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
                      <div className="col-md-8">
                        <div className="form-group d-flex justify-content-between">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="btn btn-white py-3 px-4 me-3"
                          >
                            Back
                          </button>
                          <input
                            type="submit"
                            value="Book Your Table Now"
                            className="btn btn-white py-3 px-4"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="ftco-footer ftco-no-pb ftco-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Ashraf's</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in Bookmarksgrove.
                </p>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="fa fa-twitter"></span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="fa fa-facebook"></span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="fa fa-instagram"></span>
                    </a>
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
                    <span>Closed</span>
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
                    style={{ backgroundImage: "url(images/insta-1.jpg)" }}
                  ></a>
                  <a
                    href="#"
                    className="thumb-menu img"
                    style={{ backgroundImage: "url(images/insta-2.jpg)" }}
                  ></a>
                  <a
                    href="#"
                    className="thumb-menu img"
                    style={{ backgroundImage: "url(images/insta-3.jpg)" }}
                  ></a>
                </div>
                <div className="thumb d-flex">
                  <a
                    href="#"
                    className="thumb-menu img"
                    style={{ backgroundImage: "url(images/insta-4.jpg)" }}
                  ></a>
                  <a
                    href="#"
                    className="thumb-menu img"
                    style={{ backgroundImage: "url(images/insta-5.jpg)" }}
                  ></a>
                  <a
                    href="#"
                    className="thumb-menu img"
                    style={{ backgroundImage: "url(images/insta-6.jpg)" }}
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

export default Reservation;
