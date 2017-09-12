import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { slide as Menu } from 'react-burger-menu';

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
    axios.get('http://localhost:8001/sampleproducts').then( (results) => {
        // console.log(results.data);
        this.setState({
            products: results.data
        })
    })
    localStorage.setItem('userid','2');
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
          <Menu hidden={this.state.scrolled} width={ 200 } >
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/market">Shop</a>
            <a id="contact" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
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
                        <a href={`/market/${product.productid}`}>
                            <img alt='product' className='product-image' src={product.imgurl} />
                        </a>
                    </div>
                )
            })}
        </div>

        <Footer />
        <ScrollEvent handleScrollCallback={this.handleScroll}/>

      </div>
    );
  }
}

export default Landing;