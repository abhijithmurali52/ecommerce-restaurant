import React, { useEffect } from "react";
import bgNew3 from "../images/bgNew3.avif";

function Contact() {
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
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div class="container">
          <a class="navbar-brand" href="index.html">
            Ashraf's
            <span></span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="oi oi-menu"></span> Menu
          </button>

          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a href="index.html" class="nav-link">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a href="about.html" class="nav-link">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a href="chef.html" class="nav-link">
                  Chef
                </a>
              </li>
              <li class="nav-item">
                <a href="menu.html" class="nav-link">
                  Menu
                </a>
              </li>
              <li class="nav-item">
                <a href="reservation.html" class="nav-link">
                  Reservation
                </a>
              </li>
              <li class="nav-item">
                <a href="blog.html" class="nav-link">
                  Blog
                </a>
              </li>
              <li class="nav-item">
                <a href="contact.html" class="nav-link">
                  Contact
                </a>
              </li>
              <p>
                <a
                  href="#"
                  class="btn btn-primary"
                  style={{ marginTop: " 1.3rem" }}
                >
                  Order Now
                </a>
              </p>
            </ul>
          </div>
        </div>
      </nav>

      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: `url(${bgNew3})`, position: "relative" }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row no-gutters slider-text align-items-end justify-content-center">
            <div className="col-md-9 text-center mb-5">
              <h1 className="mb-2 bread" style={{ color: "#fff" }}>
                Contact us
              </h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html" style={{ color: "#fff" }}>
                    Home <i className="fa fa-chevron-right"></i>
                  </a>
                </span>
                <span style={{ color: "#fff" }}>
                  Contact us <i className="fa fa-chevron-right"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section contact-section bg-light">
        <div className="container">
          <div className="row d-flex contact-info">
            <div className="col-md-12">
              <h2 className="h4 font-weight-bold">Contact Information</h2>
            </div>
            <div className="w-100"></div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Address:</span> 198 West 21th Street, Suite 721 New York
                  NY 10016
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Phone:</span>{" "}
                  <a href="tel://1234567920">+ 1235 2355 98</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Email:</span>{" "}
                  <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Website:</span> <a href="#">yoursite.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section ftco-no-pt contact-section">
        <div className="container">
          <div className="row d-flex align-items-stretch no-gutters">
            <div className="col-md-6 p-5 order-md-last">
              <h2 className="h4 mb-5 font-weight-bold">Contact Us</h2>
              <form action="#">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Send Message"
                    className="btn btn-primary py-3 px-5"
                  />
                </div>
              </form>
            </div>
            <div className="col-md-6 d-flex align-items-stretch">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="ftco-footer ftco-no-pb ftco-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Ashrafs</h2>
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
        <div className="container-fluid px-0 bg-primary py-3">
          <div className="row no-gutters">
            <div className="col-md-12 text-center">
              <p className="mb-0">
                Copyright &copy;
                <script>{`document.write(new Date().getFullYear());`}</script>{" "}
                All rights reserved | This template is made with
                <i className="fa fa-heart" aria-hidden="true"></i> by
                <a
                  href="https://colorlib.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Colorlib
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
