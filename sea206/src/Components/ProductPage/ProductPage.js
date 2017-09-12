import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {slide as Menu} from 'react-burger-menu';

import axios from 'axios';
import ScrollEvent from 'react-onscroll';
import './ProductPage.css';

class ProductPage extends Component {
    constructor() {
        super();
        this.state = {
            product: { productname: 'no product found'},
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8001/product/${this.props.match.params.productID}`).then( (results) => {
        console.log(results.data);
            this.setState({
                product: results.data
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

    addToCart() {
        console.log('added to cart');
        let config = {
            productid: this.state.product.productid,
            productprice: this.state.product.price,
            quantity: 1,
            imgurl: this.state.product.imgurl
            }
            axios.post('http://localhost:8001/addToCart', config)
            .then( (config) => config)
            .catch( (err) => err);
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
                    </Menu>
                </div>
                <div>
                    <Header/>
                </div>
                <div className='header-logo-market'>
                    SEA 206 Clothing
                </div>


                <div className='product-container'>

                    <div className='product-image-container'>
                        <img alt='merchandise' className='single-product-image' src={this.state.product.imgurl} />
                    </div>

                    <div className='product-description-container'>
                        <h1 className='product-title'>{this.state.product.productname}</h1>
                        <h2 className='product-price'>${this.state.product.price}.00</h2>
                        <button className='add-to-cart-button' onClick={this.addToCart}>Add to cart</button>
                        <Link to={'/cart'}><button>Cart</button></Link>

                        <div className='product-description'>
                            <p>
                                On demand printed hoodies can take 3 - 5 days to be shipped.
                                <br />
                                <br />
                                This item is made in the USA out of California fleece which, opposed to 
                                typical synthetic fleece, is made of 100% extra soft ring-spun combed cotton. 
                                It's pre-washed to minimize shrinkage, and is breathable yet extra thick for warmth.
                            </p>
                                <br />
                            <ul>
                                <li>100% California fleece cotton</li>
                                <li>Made in the USA, sweatshop free</li>
                                {/* <li></li>
                                <li></li>
                                <li></li> */}
                            </ul>
                        </div>
                    </div>
                </div>

                <img alt='size-chart' className='size-chart' src='https://cdn.shopify.com/s/files/1/1612/2077/products/Hoodie_Sizing_2048x2048.JPG?v=1480226880' />

                <Link to={"/Market"}><button className='back-button'>Back</button></Link>
                
                <Footer/>
                <ScrollEvent handleScrollCallback={this.handleScroll}/>
            </div>
        );
    }
}

export default ProductPage;