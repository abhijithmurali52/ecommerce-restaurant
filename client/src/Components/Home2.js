import React from 'react'
import '../Css/img.css'
import bgNew6 from '../images/bgNew6.jpg';
import bgNew10 from '../images/bgNew10.jpg';
import bgNew7 from '../images/bgNew7.jpg';

function Home() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div class="container">
                    <a class="navbar-brand" href="index.html">Ashraf's
                        <span></span>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="oi oi-menu"></span> Menu
                    </button>

                    <div class="collapse navbar-collapse" id="ftco-nav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
                            <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
                            <li class="nav-item"><a href="chef.html" class="nav-link">Chef</a></li>
                            <li class="nav-item"><a href="menu.html" class="nav-link">Menu</a></li>
                            <li class="nav-item"><a href="reservation.html" class="nav-link">Reservation</a></li>
                            <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
                            <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                            <p><a href="#" class="btn btn-primary" style={{ marginTop: " 1.3rem" }}>Order Now</a></p>
                        </ul>
                    </div>
                </div>
            </nav>
            <section class="hero-wrap">
                <div class="slider-item js-fullheight" style={{ backgroundImage: `url(${bgNew6})` }}>
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                            <div class="col-md-12 ftco-animate">
                                <div class="text w-100 mt-5 text-center">
                                    <span class="subheading"><h2>Ashraf's Restaurant</h2></span>
                                    <h1>Catering</h1>
                                    <span class="subheading-2 sub">Food</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slider-item js-fullheight" style={{ backgroundImage: `url(${bgNew10})` }}>
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                            <div class="col-md-12 ftco-animate">
                                <div class="text w-100 mt-5 text-center">
                                    <span class="subheading"><h2>Ashraf's Restaurant</h2></span>
                                    <h1>Catering</h1>
                                    <span class="subheading-2 sub">Food</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slider-item js-fullheight" style={{ backgroundImage: `url(${bgNew7})` }}>
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                            <div class="col-md-12 ftco-animate">
                                <div class="text w-100 mt-5 text-center">
                                    <span class="subheading"><h2>Ashraf's Restaurant</h2></span>
                                    <h1>Takeaway</h1>
                                    <span class="subheading-2 sub">Food</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home