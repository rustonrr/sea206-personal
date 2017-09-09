import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className='footer-main'>
                <div className='home-menu-footer'>
                    <ul>
                        <li className='list-items'>
                            <a href="/">Home</a>
                        </li>
                        <li className='list-items'>
                            <a href="/market">Shop</a>
                        </li>
                        <li className='list-items'>
                            <a href="/about">About</a>
                        </li>
                        <li className='list-items'>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className='copyright'>
                    © 2017, SEA 206 Clothing.
                </div>
            </div>
        );
    }
}

export default Footer;