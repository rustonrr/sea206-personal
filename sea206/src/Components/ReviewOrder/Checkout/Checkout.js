import React, { Component } from 'react';

import './Checkout.css';

class Checkout extends Component {
    constructor() {
        super()
    
        this.state = {
          isLoading: false,
          stripeToken: null
        }
    
        // configure Stripe Checkout
        this.stripeHandler = window.StripeCheckout.configure({
          key: 'pk_test_9WZYVS7dxLuosBrE2oKcLJQg',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          token: this.onGetStripeToken.bind(this)
        });
    }
    

    onGetStripeToken (token) {
        // Got Stripe token. This means user's card is valid!
        // We need to continue the payment process by sending this token to our own server.
        // More info: https://stripe.com/docs/charges
        this.setState({stripeToken: token})
      }
    
    onClickPay (e) {
        e.preventDefault()
        this.setState({isLoading: true});

    const onCheckoutOpened = () => {
        this.setState({isLoading: false})
    }

    // open Stripe Checkout
    let subtotal = (this.props.total * 100)
    this.stripeHandler.open({
        name: 'SEA206 Clothing',
        // description: 'An awesome product',
        amount: subtotal, // 10 USD -> 1000 cents
        currency: 'usd',
        opened: onCheckoutOpened.bind(this)
    });
    }
      
    render() {
        // console.log(this.props.total);
        let buttonText = this.state.isLoading ? "Please wait ..." : "Pay $" + this.props.total + ".00";
        let buttonClassName = "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "")
        if (this.state.stripeToken) {
          buttonText = "Processing your payment ..."
          buttonClassName = "Pay-Now Pay-Now-Disabled"
        }

        return (
          <div>

            <p>
              {"Tap the button below to open Stripe's Checkout overlay."}
            </p>
            {this.state.stripeToken ? <p>{"Got Stripe token ID: " + this.state.stripeToken.id + ". Continue payment process in the server."}</p> : null}
            <a className={buttonClassName} href="/" onClick={this.onClickPay.bind(this)}>{buttonText}</a>
          </div>
        );
      }
    }

export default Checkout;

