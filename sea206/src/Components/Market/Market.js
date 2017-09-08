import React, {Component} from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {slide as Menu} from 'react-burger-menu';

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
        axios.get('http://localhost:8001/products').then( (results) => {
            console.log(results.data);
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
                        <a id="contact" className="menu-item" href="/contact">About</a>
                        <a id="contact" className="menu-item" href="/contact">Contact</a>
                    </Menu>
                    {/* <div>
                        test
                    </div> */}
                </div>


                <div>
                    <Header/>
                </div>
                <div className='header-logo'>
                    SEA 206 Clothing
                </div>

                <div className='store-main'>
                    <div className='products'>
                        {this.state.products.map((product, index) => {
                            return (
                                <div className='product-list' key={index}>
                                    {/* <b>Product: </b>{product.productname} */}
                                    <img className='product-image' src={product.imgurl} />
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