import React, { useState, useContext, useEffect } from "react";
import "../Css/index.css";
import "../App.css";
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


function StaticMenu() {
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
        <Navbar />
        <section class="ftco-section">
            <div class="container">
              <div class="row justify-content-center mb-5 pb-2">
                <div class="col-md-7 text-center heading-section ftco-animate">
                  <span class="subheading">Ashraf’s Tasting Menu</span>
                  <h2 class="mb-4">STARTERS</h2>
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
    </div>
  )
}

export default StaticMenu