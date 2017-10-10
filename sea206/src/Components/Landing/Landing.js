import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScrollEvent from 'react-onscroll';
import './Landing.css';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
        products: [],
        scrolled: false
    }
    this.handleScroll = this.handleScroll.bind(this);
}

componentDidMount() {
    // console.log(process.env)
    axios.get(process.env.REACT_APP_API_URL + '/sampleproducts').then( (results) => {
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
    if(window.scrollY === 0) {
        this.setState({
            scrolled: false
        })
    }
    // console.log('scroll1', this.state.scrolled)
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
          <Menu hidden={this.state.scrolled} width={ 200 } >
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/market">Shop</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <br />
            <Link to='/cart'><img className='burger-cart' alt='cart' src='https://image.flaticon.com/icons/svg/2/2772.svg' /></Link>
          </Menu>
        </div>

        <Header />

        <div className='sea206main'>
            {/* <Link to='/Market'>
                <button className='market-button'>Test link to market</button>
            </Link> */}
        </div>

        <div className='landing-middle'>
            <div className='fresh'><strong>OUR FRESHEST SEATTLE URBAN WEAR AND PNW ACCESSORIES</strong></div>
            <div className='printed'><p>All of our garments are printed on demand. The printing process typically takes 3-5 business days.</p></div>
            <div className='printed2'><p>Shipping via USPS usually takes 1-3 days.</p></div>
        </div>

        <div className='sample-products-container'>
            {this.state.products.map((product, index) => {
                return (
                    <div className='sample-product-list' key={index}>
                        <a className='hover-link' href={`/market/${product.productid}`}>
                            <img alt='product' 
                                className='product-image' src={product.imgurl}  
                                onMouseEnter={() => {this.handleMouseEnter(product, index)} } 
                                onMouseLeave={() => {this.handleMouseLeave(product, index)} } />
                            <div className='hover-text' hidden={!product.hovered} >
                                <h1 className='hover-title'>{product.productname}</h1>
                                <h2 className='hover-price'>${product.price}.00 </h2>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>

        <div className='subscribe-discount-container'>
            <h1 className='subscribe-info'>Subscribe to our Pre-order Notifications and Receive 15% off</h1>
            <form className='email-subscribe'>
                <input id="m" type="text" />
                <button>Subscribe</button>
            </form>
        </div>

        <Footer />
        <ScrollEvent handleScrollCallback={this.handleScroll}/>

      </div>
    );
  }
}

export default Landing;