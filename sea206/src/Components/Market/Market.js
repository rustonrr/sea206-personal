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
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + '/products').then( (results) => {
            console.log(results.data)
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

    handleMouseEnter(product, id) {
        product.hovered = true;
        // console.log(product.hovered)
        this.setState({
            hovered: true
        })
    }

    handleMouseLeave(product, id) {
        product.hovered = false;
        // console.log(product.hovered)
        this.setState({
            hovered: false
        })
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
                </div>

                <div className='store-main'>
                    <div className='products'>
                        {this.state.products.map((product, index) => {
                            return (
                                <div className='product-list' key={index}>
                                    <a className='hover-link' href={`/market/${product.productid}`}>
                                        <img alt='product' 
                                            className='product-image' src={product.imgurl} 
                                            onMouseEnter={() => {this.handleMouseEnter(product, index)} } 
                                            onMouseLeave={() => {this.handleMouseLeave(product, index)} }  />
                                    <div className='hover-text' hidden={!product.hovered} >
                                        <h1 className='hover-title'>{product.productname}</h1>
                                        <h2 className='hover-price'>${product.price}.00 </h2>
                                    </div>
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