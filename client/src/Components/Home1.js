import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'; // Assuming NavBar component is in a separate file
import './HomePage.css';

const Home = () => {
    const [visibleSections, setVisibleSections] = useState({
        menus: false,
        reservations: false,
        specials: false,
    });

    useEffect(() => {
        const handleScroll = () => {
            const sections = {
                menus: document.querySelector('.menus-section'),
                reservations: document.querySelector('.reservations-section'),
                specials: document.querySelector('.specials-section'),
            };

            const isInViewport = (elem) => {
                const rect = elem.getBoundingClientRect();
                return rect.top <= window.innerHeight && rect.bottom >= 0;
            };

            setVisibleSections({
                menus: isInViewport(sections.menus),
                reservations: isInViewport(sections.reservations),
                specials: isInViewport(sections.specials),
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroSectionStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/pic.jpeg)`,
    };

    return (
        <div className="home-page">
            <NavBar />
            <div className="hero-section" style={heroSectionStyle}>
                <h1>Welcome to Our Restaurant</h1>
                <p>Experience the best of Indian cuisine with our exquisite menu and delightful ambiance.</p>
                <button className="reservation-button">Make a Reservation</button>
            </div>
            <div className="content-section">
                <div className={`section menus-section ${visibleSections.menus ? 'visible' : ''}`}>
                    <h2>Our Menus</h2>
                    <p>Explore our diverse menu offering a variety of traditional and contemporary dishes crafted to perfection. Whether you're in the mood for a classic curry or a modern twist on Indian favorites, we have something to satisfy every palate.</p>
                    <button className="reservation-button">View Menu</button>
                </div>
                <div className={`section reservations-section ${visibleSections.reservations ? 'visible' : ''}`}>
                    <h2>Reservations</h2>
                    <p>Ensure a spot at our restaurant by booking your table in advance. We offer a comfortable dining experience, whether you're joining us for a special occasion or a casual meal.</p>
                    <button className="reservation-button">Book a Table</button>
                </div>
                <div className={`section specials-section ${visibleSections.specials ? 'visible' : ''}`}>
                    <h2>Specials</h2>
                    <p>Don't miss out on our daily specials and seasonal offerings. From unique dishes to limited-time promotions, our specials are designed to bring you the best of our kitchen.</p>
                    <button className="reservation-button">See Specials</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
