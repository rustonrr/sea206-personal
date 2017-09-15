import React, { Component } from 'react';

import './ReviewNotification.css';

class ReviewNotification extends Component {
    render() {
        return (
            <h7 className={this.props.submittedReview ? 'show' : ''}>Thanks for submitting a review!</h7>
        );
    }
}

export default ReviewNotification;