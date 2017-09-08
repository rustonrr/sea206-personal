import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './About.css';

class About extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className='about-us'>
                    <h1>About Us</h1>
                </div>
                <div className='brand-statement'>
                    <p>We are a Northwest lifestyle brand based in Seattle, Washington that do things a little differently. As recent college grads we don't have a warehouse or fulfillment center so we decided to break the mold of the typical t-shirt company. Instead of keeping large amounts of inventory we print our garments on demand. Once you place an order our screen printers print your order, bag them up, and ship them out. The printing process typically take 3-5 business days. The shirt you receive is fresh off the press and made individually just for you. You can always exchange your items for free at any time so you can get the perfect fit. </p>
                </div>
                <Footer />
            </div>
        );
    }
}

export default About;