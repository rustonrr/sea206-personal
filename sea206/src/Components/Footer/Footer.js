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
                            <Link to='/'>
                                <button>Home</button>
                            </Link>
                        </li>
                        <li className='list-items'>
                            <Link to='/market'>
                                <button>Shop</button>
                            </Link>
                        </li>
                        <li className='list-items'>
                            <Link to='/about'>
                                <button>About</button>
                            </Link>
                        </li>
                        <li className='list-items'>
                            <Link to='#'>
                                <button>Contact</button>
                            </Link>
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