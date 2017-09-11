import React, {Component} from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import {slide as Menu} from 'react-burger-menu';

import ScrollEvent from 'react-onscroll';
import './About.css';

class About extends Component {
    constructor() {
        super();
        this.state = {
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        // this.handleScrollToTop = this.handleScrollToTop.bind(this);
    }
    
      handleScroll() {
          this.setState({
              scrolled: true
          })
          // console.log('scroll1', this.state.scrolled)
          if(document.body.scrollTop === 0) {
              this.setState({
                  scrolled: false
              })
          }
      }

    render() {
        return (
            <div className='about-container'>
                <div hidden={this.state.scrolled}>
                    <Menu hidden={this.state.scrolled} width={200}>
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="about" className="menu-item" href="/market">Shop</a>
                        <a id="contact" className="menu-item" href="/about">About</a>
                        <a id="contact" className="menu-item" href="/contact">Contact</a>
                    </Menu>
                </div>
                <div>
                    <Header/>
                </div>
                <div className='header-logo'>
                    SEA 206 Clothing
                </div>
                <div className='about-us'>
                    <h1>About Us</h1>
                </div>
                <div className='brand-statement'>
                    <p className='paragraph'>We are a Northwest lifestyle brand based in Seattle, Washington that do
                        things a little differently. As recent college grads we don't have a warehouse
                        or fulfillment center so we decided to break the mold of the typical t-shirt
                        company. Instead of keeping large amounts of inventory we print our garments on
                        demand. 
                        <br />
                        <br />
                        Once you place an order our screen printers print your order, bag them
                        up, and ship them out. The printing process typically take 3-5 business days.
                        The shirt you receive is fresh off the press and made individually just for you.
                        You can always exchange your items for free at any time so you can get the
                        perfect fit.
                    </p>
                </div>
                <img alt='about sea206' className='about-image' src='https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/sjw_04' />
                <Footer/>

                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default About;