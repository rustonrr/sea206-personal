import React, {Component} from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {slide as Menu} from 'react-burger-menu';

import axios from 'axios';

import './Market.css';

class Market extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8001/products').then( (results) => {
            console.log(results.data);
            this.setState({
                products: results.data
            })
        })
    }

    render() {
        return (
            <div>
                <Menu width={200}>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/Market">Shop</a>
                    <a id="contact" className="menu-item" href="/contact">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                </Menu>
                <div>
                    <Header/>
                </div>
                <div className='store-main'>



                    {this.state.products.map((product, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    <b>Product: </b>{product.productname} 
                                    <img src={product.imgurl} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Market;