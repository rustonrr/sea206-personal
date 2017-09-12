import React, { Component } from 'react';

import './CartNotification.css';

class CartNotification extends Component {
    render() {
        return <h7 className={this.props.addedToCart ? 'show' : ''}>Added To Cart!</h7>
    }
}

export default CartNotification;