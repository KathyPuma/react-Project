import React from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import './Image.css';
class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
      imageFile: null,
      loggedUser: 1,
      tagStr: "",
      tagId: null,
      imgId: null,
      tagsId: [],
      tagsName: [],
      imgPreview: ""
    }
  }
  handleFileInput = async (event) => {
    this.setState({
      imageFile: event.target.files[0],
    })
    const allImages = await axios.get('http://localhost:3001/images/all')
    const allImagesData = allImages.data.payload
    this.setState({
      imgId: allImagesData[allImagesData.length - 1].id + 1
    })
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(this.state.imageFile)
  }
  inputKeyDown = async (event) => {
    this.setState({
      tagStr: event.target.value
    })
    let tagStr = event.target.value
    if (event.key === 'Enter' && tagStr) {
      let tagIdExist = await axios.get(`http://localhost:3001/tags/tag/${tagStr}`).then((res) => { return res.data.success });
      if (this.state.tagsName.find(tag => tag === tagStr)) {
        return;
      }
      if (!tagIdExist) {
        await axios.post(`http://localhost:3001/tags/tag/${tagStr}`);
        let postedTagId = await axios.get(`http://localhost:3001/tags/tag/${tagStr}`).then((res) => { return res.data.tagId.id });
        this.setState({
          tagId: postedTagId,
          tagsName: [...this.state.tagsName, tagStr],
          tagsId: [...this.state.tagsId, postedTagId]
        })
      } else {
        let tagId = await axios.get(`http://localhost:3001/tags/tag/${tagStr}`)
        let tagIdData = tagId.data.tagId.id

        this.setState({
          tagId: tagIdData,
          tagsName: [...this.state.tagsName, tagStr],
          tagsId: [...this.state.tagsId, tagIdData]
        })
      }
      this.tagInput.value = null;
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { tagsId, imgId } = this.state
    const data = new FormData()
    //for(var x = 0; x<this.state.imageFile.length; x++){
    data.append('image', this.state.imageFile)


    try {
      const res = await axios.post('http://localhost:3001/upload', data)

      const post = axios.put(`http://localhost:3001/images/post`, { img_src: res.data.imageUrl, users_id: this.state.loggedUser })
      // post tags to the imagestags table with tag_id (from this.state.tagIds) and img_id (from response from updated images table)
      this.setState({
        imageUrl: res.data.imageUrl,
        //imageFile: event.target.files,
        loaded: 0,
      })
    } catch (err) {
      console.log(err)
    }
    this.postTags(tagsId, imgId)
    this.handleResetTags()
  }
  postTags = async (tagsId, imgId) => {
    if (imgId !== null) {

      for (let i = 0; i < tagsId.length; i++) {
        try {
          const addTagsTOImage = await axios.post(`http://localhost:3001/imageTags/addTagToImage/`, { tag_id: tagsId[i], img_id: imgId })
          const getallTagsAndIds = await axios.get(`http://localhost:3001/imageTags/`)
        } catch (error) {
          console.log(error)
        }
      }
    }
    this.handleResetTags()
  }
  handleResetTags = () => {
    this.setState({
      tagsId: [],
      tagsName: [],
      imageUrl: "",
      imagePreviewUrl: null,
      tagStr: "",
    })
  }
  render() {
    let { imagePreviewUrl, tagsName } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img className= "imagePrev" src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">No Image Preview</div>);
    }
    return (
      <div className="image">
        {/* <div className ="image_stage"> */}
        <p>Upload image</p>
        <form onSubmit={this.handleSubmit}>
          <input type="file"
            onChange={this.handleFileInput} placeholder="Write tags with hashtags" />
          <input className="image_submit" type="submit" value="Upload" />
        </form>
        <ul className="input-tag__tags">
          {tagsName.map((tagsName, i) => (
            <li className="listOfTags" key={tagsName}>
              {tagsName}
            </li>
          ))}
          <li className="input-tag__tags__input"><input type="text" placeholder="InsertTags" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
        </ul>
        {imagePreview}
      </div>
    );
  }
}
export default Image;