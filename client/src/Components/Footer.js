import React from 'react'
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


function Footer() {
  return (
    <div>
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
    </div>
  )
}

export default Footer