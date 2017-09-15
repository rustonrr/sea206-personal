import React, {Component} from 'react';

import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';

import Checkout from './Checkout/Checkout';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {slide as Menu} from 'react-burger-menu';
import ScrollEvent from 'react-onscroll';

import './ReviewOrder.css';

class ReviewOrder extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8001/reviewOrder', {
            params: {userid: localStorage.getItem('userid')}
        })
            .then( (results) => {
            // console.log(results.data);
            this.setState({
                order: results.data
            })
        })
        // console.log(this.state.cart)
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
        let getSum = function(array) {
            let total = 0
            for (var i = 0; i < array.length; i++) {
              total += array[i].productprice;
            }
            return total;
        };
        let subtotal = getSum(this.state.order);
        let taxes = Math.floor( (getSum(this.state.order) * .08) );
        let total = (subtotal + taxes);
        // console.log('test', total)
        
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
                
                <Link to={"/Cart"}><button className='back-button'>Back</button></Link>

                <div>
                    <div>
                        {this.state.order.map((product, index) => {
                            return (
                                <div className='cart-product-container' key={index}>
                                    <div className='order-image-container' >
                                        <img alt='cart-product' className='order-image' src={product.imgurl} />
                                    </div>
                                    <div className='order-description-container'>
                                        <h1 className='cart-productname'>{product.productname}</h1>
                                        <br />
                                        <h1 className='cart-price-quantity'>Price: ${product.productprice}.00</h1>
                                        <br />
                                        <h1 className='cart-price-quantity'>Quantity: {product.quantity}</h1>
                                    </div>
                                </div>
                            )
                        })}
                    <hr />
                    </div>
                    <div className='total-price-container'>
                        <div className='price-categories'>
                            <h1>Subtotal:</h1>
                            <h1>Taxes:</h1>
                            <h1>Shipping:</h1>
                        </div>
                        <div className='price-values'>
                            <h1>${subtotal}.00 </h1>
                            <h1>${taxes}.00</h1>
                            <h1>FREE</h1>
                        </div>
                    </div>
                    <div className='bottom-line-container'>
                        <h1 className='bottom-line'>Total: ${total}.00</h1>
                    </div>

                    <br />
                </div>

            <div className='checkout-component'>
                <Checkout total={total} />
            </div>

                <Footer/>
                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.subtotal
    }
}

export default connect(mapStateToProps)(ReviewOrder);