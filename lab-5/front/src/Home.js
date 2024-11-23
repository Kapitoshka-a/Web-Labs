import React from 'react';
import './css/style.css';
import Establishments from "./scripts/Establishments";

// Import images
import logo from './images/logo.svg';
import heroSectionPhoto from './images/hero-section-photo.svg';
import linr from './images/linr.svg';
import littleDots from './images/little_dots.svg';
import logoFooter from './images/logo-footer.svg';

const Home = () => {
    return (
        <div>
            <header className="header">
                <img src={logo} alt="logo" />
                <nav className="desktop-nav">
                    <a href="/"> <span>Home</span></a>
                    <a href="/"> Find a doctor </a>
                    <a href="/"> Apps </a>
                    <a href="/"> Testimonials </a>
                    <a href="/"> About us </a>
                </nav>
                <nav className="burger-nav" role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" id="burger-checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <div id="popup-menu">
                            <ul id="menu">
                                <li><a href="/">Home</a></li>
                                <li><a href="/#">Find a doctor</a></li>
                                <li><a href="/#">Apps</a></li>
                                <li><a href="/#">Testimonials</a></li>
                                <li><a href="/#">About us</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="heroSection">
                <div className="dots"></div>
                <div className="qwerty">
                    <h2>Virtual healthcare for you</h2>
                    <h3>Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone</h3>
                    <div>
                        <a href="/#" className="consult-button">Consult today</a>
                    </div>
                </div>
                <img src={heroSectionPhoto} alt="Hero section" />
            </section>

            <section className="features">
                <div className="feature-info">
                    <h2>Leading healthcare <br /> providers</h2>
                    <img src={linr} alt="Line representation" />
                    <h3>Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone. To us, it's not just work. We take pride in the solutions we deliver</h3>
                    <button>Learn More</button>
                </div>
            </section>

            <section className="testimonials-section">
                <h2 className="testimonials-heading">Our services</h2>
                <img src={linr} alt="Line representation" />
                <p className="sup-descrip">
                    We provide to you the best choices for you. Adjust it to your health needs and make sure you undergo treatment with our highly qualified doctors. You can consult with us which type of service is suitable for your health.
                </p>
                <div className="bubble"></div>
                <div className="dot"></div>
                <div className="second_dot"></div>
                <Establishments />
            </section>

            <div className="learn-more">
                <button>Learn more</button>
            </div>

            <footer className="footer">
                <img className="dots_footer" src={littleDots} alt="dots" />
                <img src={logoFooter} alt="logo" />
                <nav>
                    <a href="/">Company</a>
                    <a href="/">Region</a>
                    <a href="/">Help</a>
                </nav>
            </footer>
        </div>
    );
};

export default Home;


