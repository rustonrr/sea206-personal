import React, { Component } from 'react';

import axios from 'axios';
import './Checkout.css';

class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          stripeToken: null,
          fireRedirect: false,
          total: this.props.total
        }
        this.onClickPay = this.onClickPay.bind(this);
    
        // configure Stripe Checkout
        this.stripeHandler = window.StripeCheckout.configure({
          key: 'pk_test_9WZYVS7dxLuosBrE2oKcLJQg',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          token: this.onGetStripeToken.bind(this)
        });
    }
    

    onGetStripeToken (token) {
        let userid = localStorage.getItem('userid');
        // console.log(userid);
        // Got Stripe token. This means user's card is valid!
        this.setState({stripeToken: token})
        axios.post(process.env.REACT_APP_API_URL + '/api/payment', { token: token, total: this.props.total }).then(response => {
          window.location.href="/thankyou";
          axios.delete(process.env.REACT_APP_API_URL + '/ordercomplete', { params: {userid} })
        });
    }

    onClickPay (e) {
        e.preventDefault()
        this.setState({ fireRedirect: true })

    // open Stripe Checkout
        let subtotal = (this.props.total * 100)
        console.log('subtotal', subtotal)
        this.stripeHandler.open({
            name: 'SEA206 Clothing',
            amount: subtotal, // 10 USD -> 1000 cents
            currency: 'usd'
        });
    }
      
    render() {
      // console.log('state', this.state.total);
      // console.log('props', this.props.total);
        return (
          <div className='checkout-container'>
          
            <a className='Pay-Now' href="http://localhost:3000/" onClick={this.onClickPay}>Pay ${this.props.total}.00</a>
          </div>
        );
      }
    }

export default Checkout;

