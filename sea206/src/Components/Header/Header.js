import React, {Component} from 'react';
import './Header.css';

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
    // handleScrollToTop() {
    //     this.setState({
    //         notScrolled: true
    //     })
    //     console.log('scrolled back to top', this.state.notScrolled)
    // }

    render() {
        return (
            <div hidden={this.state.notScrolled}>
                <div className="navbar">
                    {/* <div className='menu-item-container'> */}
                        <a href="/">Home</a>
                        <a href="/market">Shop</a>
                        <a href="/about">About</a>
                        <a href="#">Contact</a>
                    {/* </div> */}
                </div>

                <ScrollToTop showUnder={160}>
                    <img className='scroll-to-top' src='http://freevector.co/wp-content/uploads/2011/07/25366-arrow-up-on-a-black-circle-background1.png' />
                </ScrollToTop>

                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default Header;