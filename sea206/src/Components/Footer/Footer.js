import React, {Component} from 'react';
// import {Link} from 'react-router-dom';

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
                    <br />
                    <br />
                    <i>This website was created for a school project by Ruston Reformado. To purchase these products, please go to www.sea206.com.</i>
                </div>
            </div>
        );
    }
}

export default Footer;