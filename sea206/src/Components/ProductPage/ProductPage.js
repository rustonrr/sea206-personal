import React, { Component } from 'react';

import axios from 'axios';

class ProductPage extends Component {
    constructor() {
        super();
        this.state = {
            product: { productname: 'no product found'}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8001/product/${this.props.match.params.productID}`).then( (results) => {

            this.setState({
                product: results.data
            })
        })
    }

    render() {
        return (
            <div>
                Product page test
                <div>{this.state.product.productname}</div>
            </div>
        );
    }
}

export default ProductPage;