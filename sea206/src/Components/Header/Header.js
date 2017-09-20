import React, {Component} from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
import ScrollEvent from 'react-onscroll';
import ScrollToTop from 'react-scroll-up';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            notScrolled: true
        }
        this.handleScroll = this.handleScroll.bind(this);
        // this.handleScrollToTop = this.handleScrollToTop.bind(this);
    }

    handleScroll() {
        this.setState({
            notScrolled: false
        })
        // console.log('scroll', this.state.notScrolled)
        if(document.body.scrollTop === 0) {
            this.setState({
                notScrolled: true
            })
        }
    }


    render() {
        return (
            <div hidden={this.state.notScrolled}>
                <div className="navbar">
                    <a href="/">Home</a>
                    <a href="/market">Shop</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    {/* <Link to='/cart'><img src='https://image.flaticon.com/icons/svg/2/2772.svg' /></Link> */}
                </div>

                <ScrollToTop showUnder={160}>
                    <div className='scroll-to-top-container'>
                        <div className='market-cart-button-container'>
                            <Link className='market-cart-button-link' to='/cart'><img className='market-cart-button' alt='cart' src='https://image.flaticon.com/icons/svg/2/2772.svg' /></Link>
                        </div>
                        <img alt='scroll to top' className='scroll-to-top' src='http://freevector.co/wp-content/uploads/2011/07/25366-arrow-up-on-a-black-circle-background1.png' />
                    </div>
                </ScrollToTop>

                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default Header;