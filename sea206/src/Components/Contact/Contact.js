import React, {Component} from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router-dom';


import ScrollEvent from 'react-onscroll';
import './Contact.css';

class Market extends Component {
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
                        <br />
                        <Link to='/cart'><img className='burger-cart' alt='cart' src='https://image.flaticon.com/icons/svg/2/2772.svg' /></Link>
                    </Menu>
                    {/* <div>
                        test
                    </div> */}
                </div>

                <div>
                    <Header/>
                </div>

                <div className='header-logo-market'>
                    SEA 206 Clothing
                </div>

                <div>
                    <div className='contact-us'>
                        Contact Us
                    </div>
                    <div className='contact-info'>
                        Email us at: rustonreformado@gmail.com
                        {/* <br />
                        Text us at: (206) 707-5823 */}
                        <br />
                        <br />

                        SEA 206 Clothing
                        <br />
                        4557 11th Ave NE #308
                        <br />
                        Seattle, WA 98105
                    </div>

                    <div className='email-form'>
                        <form action="mailto:rustonreformado@gmail.com" method="post" enctype="text/plain">
                            <input className='input-forms' type="text" name="name" placeholder='Name' />
                                <br />
                            <input className='input-forms' type="text" name="mail" placeholder='Email' />
                                <br />
                                <br />
                                Comments:
                                <br />
                            <textarea className='input-forms-message' type="text" name="comment" size="50" rows="3" />
                                <br />
                            <input type="submit" value="Send" />
                            <input type="reset" value="Reset" />
                        </form>
                    </div>
                </div>

                <Footer/>
                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default Market;