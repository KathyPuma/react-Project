import React from 'react'
import axios from 'axios'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'

class Profile extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     imgUrl: '',
     imgFile: null,
   }
 }

 async componentDidMount() {
    let response = await axios.get(`http://localhost:3001/users/profilepic/${this.props.id}` )
    this.setState({
      imgUrl: response.data.body[0].img_url
    })
 }

 handleFileInput = (event) => {
   this.setState({
     imgFile: event.target.files[0]
   })
 }

 handleSubmit = async (e) => {
   e.preventDefault();
   const data = new FormData()
   data.append('image', this.state.imgFile)
   try {
     const res = await axios.post('http://localhost:3001/upload', data)
     axios.put(`http://localhost:3001/users/profilepic/${this.props.id}`, {imgUrl: res.data.imageUrl})
     this.setState({
       imgUrl: res.data.imageUrl
     })
   } catch (err) {
     console.error(err)
   }
 }

 handleRedirect(){
     this.setState({
         redirect: true
     })
 }

 render(){
    const {email, id } = this.props

        return (
            <div className="App">
                <h1>BunkR</h1>
                <img className="profilePic" src={this.state.imgUrl} alt=''></img>
                <p>Welcome {email}!</p>
                <form onSubmit={this.handleSubmit}>
                  <input type="file" onChange={this.handleFileInput} />
                  <input type="submit" value="Change Pic" />
                </form>
                <br></br>
                <Link to = {`/feed/${this.props.id}` }>Back to Feed</Link>
            </div>
          );

 }
}

export default Profile;
