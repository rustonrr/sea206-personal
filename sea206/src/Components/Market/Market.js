import React, {Component} from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ScrollEvent from 'react-onscroll';
import './Market.css';

class Market extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        axios.get(process.env.API_URL + '/products').then( (results) => {
            // console.log(results.data);
            this.setState({
                products: results.data
            })
        })
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
                </div>


                <div>
                    <Header/>
                </div>
                <div className='header-logo-market'>
                    SEA 206 Clothing
                    {/* <Link className='market-cart-button-container' to='/cart'><img className='market-cart-button' src='https://image.flaticon.com/icons/svg/2/2772.svg' /></Link> */}
                </div>

                <div className='store-main'>
                    <div className='products'>
                        {this.state.products.map((product, index) => {
                            return (
                                <div className='product-list' key={index}>
                                    <a href={`/market/${product.productid}`}>
                                        <img alt='product' className='product-image' src={product.imgurl} />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Footer/>
                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default Market;