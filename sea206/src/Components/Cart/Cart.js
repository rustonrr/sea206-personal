import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ScrollEvent from 'react-onscroll';
import './Cart.css';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8001/viewCart').then( (results) => {
            // console.log(results.data);
            this.setState({
                cart: results.data
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
        let subtotal = function(array) {
            let total = 0          
            for (var i = 0; i < array.length; i++) {
              total += array[i].productprice;
            }
            return total;
          };
        //   console.log( subtotal(this.state.cart) );

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

                <Link to='/market'><button className='return-to-store-button'>Return to store</button></Link>

                <div>
                    {this.state.cart.map((product, index) => {
                        return (
                            <div className='cart-product-container' key={index}>
                                <div className='cart-image-container' >
                                    <img alt='cart-product' className='cart-image' src={product.imgurl} />
                                </div>
                                <div className='cart-description-container'>
                                    <h1 className='cart-productname'>{product.productname}</h1>
                                    <h1 className='cart-price-quantity'>Price: ${product.productprice}.00</h1>
                                    <br />
                                    <h1 className='cart-price-quantity'>Quantity: {product.quantity}</h1>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                    <h1 className='total-price'>Subtotal: ${subtotal(this.state.cart)}.00 </h1>
                    <br />
                    <p className='shipping-taxes'>Shipping and taxes calculated at checkout</p>
                    <button className='checkout-button'>Checkout</button>
                </div>

                <Footer/>
                <ScrollEvent handleScrollCallback={this.handleScroll}/>
                
            </div>
        );
    }
}

export default Cart;