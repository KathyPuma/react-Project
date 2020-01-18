import React, { Component } from 'react';
import axios from 'axios';
import BurgerMenu from './Menu/BurgerMenu.jsx';
import FeedCards from './Feed/FeedCards.jsx'
import Image from './Image.jsx'
import Modal from 'react-modal';
// import '../App.css';

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            hashtag: "",
            urls: [],
            showModal: false
        }
        this.ref = React.createRef();
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    componentDidMount() {
        this.getAllImages();
    }
    handleInputChange = (e) => {
        this.setState({
            hashtag: e.target.value
        })
    }
    getImagesByTags = async (e) => {
        e.preventDefault();
        const { hashtag } = this.state
        let url = `http://localhost:3001/tags/${hashtag}`
        try {
            let imageByTag = await axios.get(url).then((res => { return res.data.imgArr }))
            let urlArr = imageByTag.map(elem => { return elem.img_src });
            this.setState({
                urls: urlArr,
            })
        }
        catch (err) {
            console.log("Error, something went wrong. ", err)
        }
    }
    getAllImages = async () => {
        let url = `http://localhost:3001/images/all`;
        try {
            let allImages = await axios.get(url).then((res) => { return res.data.payload })
            let allImagesUrls = allImages.map((elem) => {
                return elem.img_src;
            })
            this.setState({
                urls: allImagesUrls
            })
        }
        catch (err) {
            console.log("error:", err)
        }
    }

    handleOpenModal() {
        this.setState({ showModal: true });

    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    // componentDidMount() {
    //     Modal.setAppElement('body');
    //  }

    render() {
        const { urls, hashtag } = this.state;
        return (
            <div className="feed">
                <BurgerMenu />
                <div className="header">
                    <h1> BUNKR </h1>
                </div>
                <div className="container">
                    <form onSubmit={this.getImagesByTags}>
                        <input type="text" placeholder="Search hashtags" onChange={this.handleInputChange} />
                    </form>
                    <div>
                        <button onClick={this.handleOpenModal}  >Add a photo </button>
                        <Modal
                            isOpen={this.state.showModal}
                            contentLabel="Photo uploaded"
                        >
                            <button className="closeButton" onClick={this.handleCloseModal}>Close</button>
                            <div>{<Image />}</div>
                        </Modal>
                    </div>
                    <div className="images">
                        <FeedCards urls={urls} />
                    </div>
                    <div className="nav">
                    </div>
                </div>
            </div>
        )
    }
}
export default Feed;