import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CartNotification from './CartNotification/CartNotification';
import ReviewNotification from './ReviewNotification/ReviewNotification';
import {slide as Menu} from 'react-burger-menu';

import axios from 'axios';
import ScrollEvent from 'react-onscroll';
import './ProductPage.css';

class ProductPage extends Component {
    constructor() {
        super();
        this.state = {
            product: { productname: 'no product found'},
            scrolled: false,
            addedToCart: false,
            reviewText: '',
            reviews: [],
            submittedReview: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8001/product/${this.props.match.params.productID}`).then( (results) => {
        // console.log(results.data);
            this.setState({
                product: results.data
            })
        })
        axios.get(`http://localhost:8001/getReviews/${this.props.match.params.productID}`).then( (results) => {
            this.setState({
                reviews: results.data
            })
            console.log(this.state.reviews)
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
        this.setState({
            addedToCart: true
        });
        setTimeout( () => {
            this.setState({
              addedToCart: false,
            });
          }, 1000);

        let userid = localStorage.getItem('userid');
        if(!userid) {
            axios.get('http://localhost:8001/nextID').then( (results) => {
                let userid = results.data[0].max + 1

                localStorage.setItem('userid', userid);

                console.log(userid);
                
                let config = {
                    userid: localStorage.getItem('userid'),
                    productid: this.state.product.productid,
                    productprice: this.state.product.price,
                    quantity: 1,
                    imgurl: this.state.product.imgurl
                    }
                    axios.post('http://localhost:8001/addToCart', config)
                    .then( (config) => config)
                    .catch( (err) => err);
            })
        } else {
            let config = {
                userid: localStorage.getItem('userid'),
                productid: this.state.product.productid,
                productprice: this.state.product.price,
                quantity: 1,
                imgurl: this.state.product.imgurl
                }
                axios.post('http://localhost:8001/addToCart', config)
                .then( (config) => config)
                .catch( (err) => err);
        }
    }

    handleChange(event) {
        this.setState({reviewText: event.target.value});
        console.log(this.state.reviewText)
      }

    handleSubmit(event) {
        if(!this.state.reviewText) {
            alert('Please enter a review');
        } else {
            let config = {
                userid: localStorage.getItem('userid'),
                productid: this.state.product.productid,
                reviewtext: this.state.reviewText
                }
            console.log('A review was submitted: ' + this.state.reviewText);
            event.preventDefault();
            axios.post('http://localhost:8001/submitReview', config);
            axios.get(`http://localhost:8001/getReviews/${this.props.match.params.productID}`).then( (results) => {
                this.setState({
                    reviews: results.data,
                    submittedReview: true
                })
                console.log(this.state.reviews)
            });
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
                </div>

                <Link to={"/Market"}><button className='back-button'>Back</button></Link>


                <div className='product-container'>

                    <div className='product-image-container'>
                        <img alt='merchandise' className='single-product-image' src={this.state.product.imgurl} />
                    </div>

                    <div className='product-description-container'>
                        <h1 className='product-title'>{this.state.product.productname}</h1>
                        <h2 className='product-price'>${this.state.product.price}.00</h2>
                        <div>
                            <button className='add-to-cart-button' onClick={this.addToCart}>Add to cart</button>
                            <CartNotification addedToCart={this.state.addedToCart} />
                        </div>
                        <br />
                        <Link to={'/cart'}><button className='view-cart'>View Cart</button></Link>

                        <div className='product-description'>
                            <p>
                                On demand printed garments can take 3 - 5 days to be shipped.
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
                            </ul>

                            <div className='product-review-container'>
                                <div className='product-review'>
                                    <h1 className='review-header'>Customer Reviews</h1>
                                    <h2 hidden={this.state.reviews}>No reviews yet</h2>

                                    <form onSubmit={this.handleSubmit}>
                                        <div className='submit-form'>
                                            <label>
                                                <h1>Submit a review:</h1>
                                                <textarea hidden={this.state.submittedReview} value={this.state.reviewText} onChange={this.handleChange} />
                                            </label>
                                            <div>
                                                <input className='review-submit-button' type="submit" value="Submit" />
                                                <ReviewNotification submittedReview={this.state.submittedReview} />
                                             </div>
                                        </div>
                                    </form>

                                    <div className='review-text-container'>
                                        {this.state.reviews.map((review, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className='review' key={index}>"{review.reviewtext}"</div>
                                                    <hr />
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>

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