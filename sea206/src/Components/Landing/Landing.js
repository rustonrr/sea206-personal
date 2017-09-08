import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { slide as Menu } from 'react-burger-menu';


class Landing extends Component {



  render() {

    return (
      
      <div>

          <Menu width={ 200 } >
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/market">Shop</a>
            <a id="contact" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
          </Menu>

        <Header />

        <div className='sea206main'>
            <Link to='/Market'>
                <button className='market-button'>Test link to market</button>
            </Link>
        </div>

        <div className='landing-middle'>
            <div className='fresh'><strong>OUR FRESHEST SEATTLE URBAN WEAR AND PNW ACCESSORIES</strong></div>
            <div className='printed'><p>All of our garments are printed on demand. The printing process typically takes 3-5 business days.</p></div>
            <div className='printed2'><p>Shipping via USPS usually takes 1-3 days.</p></div>
        </div>

        <Footer />

      </div>
    );
  }
}

export default Landing;