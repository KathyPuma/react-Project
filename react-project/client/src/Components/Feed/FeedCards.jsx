import React, { Component } from 'react';
import './FeedCard.css'

class FeedCards extends Component {
    constructor(props) {
        super();
    }
    render() {
        const cards = (arr) => {
            let myCards = arr.map((elem) => {
                return <div className="card">
                    <img src={elem} alt="image" />
                </div>
            });
            return myCards;
        }
        const feedCards = cards(this.props.urls)
        return (
            <div className="card-holder">
                {feedCards}
            </div>
        )
    }
}
export default FeedCards;