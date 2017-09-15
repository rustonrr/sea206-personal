import React, {Component} from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {slide as Menu} from 'react-burger-menu';
import ScrollEvent from 'react-onscroll';

import './ThankYou.css';

class ThankYou extends Component {
    constructor() {
        super();
        this.state = {
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this);
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
            <div>
                <div hidden={this.state.scrolled}>
                    <Menu width={200}>
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="about" className="menu-item" href="/Market">Shop</a>
                        <a id="contact" className="menu-item" href="/about">About</a>
                        <a id="contact" className="menu-item" href="/contact">Contact</a>
                    </Menu>
                </div>

                <div>
                    <Header/>
                </div>

                <div className='header-logo-market'>
                    SEA 206 Clothing
                </div>

                <div className='thank-you-container'>
                    Thanks for the order!
                </div>

                <Footer/>
                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default ThankYou;