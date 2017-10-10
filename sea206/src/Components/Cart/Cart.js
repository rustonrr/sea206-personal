import React, { Component } from 'react';

import { connect } from "react-redux";

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
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    componentDidMount() {
        // let config = {
        //     userid: localStorage.getItem('userid')
        // }
        // console.log(config);
        axios.get(process.env.REACT_APP_API_URL + '/viewCart', {
            params: {userid: localStorage.getItem('userid')}
        })
            .then( (results) => {
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
        if(window.scrollY === 0) {
            this.setState({
                scrolled: false
            })
        }
    }

    removeFromCart(entryid) {
        let newCart = this.state.cart;
        for(let i = 0; i < newCart.length; i++) {
            if(newCart[i].entryid === entryid) {
                newCart.splice(i, 1)
            }
        }
        this.setState({
            cart: newCart
        })

        axios.delete(process.env.REACT_APP_API_URL + '/removeFromCart', {
            params: {entryid}
        })
    }

    goToReview(){
        alert('This website was created as a school project by Ruston Reformado. No items will be sold or shipped. To purchase the products listed on this website, please visit www.sea206.com. Thanks!')
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

                <Link to='/market'><button className='return-to-store-button'>Continue Shopping</button></Link>

                <div className='cart-header'>
                    Your Shopping Cart
                </div>

                <div>
                    {this.state.cart.map((product, index) => {
                        return (
                            <div key={index}>
                                <div className='cart-product-container' key={index}>
                                    <div className='cart-image-container'>
                                        <a href={`/market/${product.productid}`}>
                                            <img alt='cart-product' className='cart-image' src={product.imgurl} />
                                        </a>
                                    </div>
                                    <div className='cart-description-container'>
                                        {/* <h1 className='cart-productname'>{product.productname}</h1> */}
                                        <h1 className='cart-price-quantity'>Price: ${product.productprice}.00</h1>
                                        <br />
                                        <h1 className='cart-price-quantity'>Quantity: {product.quantity}</h1>
                                        <button className='remove-from-cart' onClick={ () => this.removeFromCart(product.entryid) }>Remove</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                    <h1 className='total-price'>Subtotal: ${subtotal(this.state.cart)}.00 </h1>
                    <br />
                    <p className='shipping-taxes'>Shipping and taxes calculated at checkout</p>
                    <div className='review-order-button-container'>
                        <Link to='./revieworder'><button onClick={this.goToReview} className='review-order-button'>Review Order</button></Link>
                    </div>
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

export default connect(mapStateToProps)(Cart);