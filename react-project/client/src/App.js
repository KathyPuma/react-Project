import React from 'react';
import axios from 'axios'
import Profile from './Components/Profile'
import Feed from './Components/Feed'
import LogOut from './Components/Logout'
import './App.css';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      exist: false,
      id: null,
      button: null,
      redirected: false,
      defaultPhoto: "http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png",
    }
  }

  // componentDidMount = async() => {
  //   const checkIfUserIsLoggedIn = await axios.get(`http://localhost:3001/users/logged-in`)
  //   let loggedInEmail= checkIfUserIsLoggedIn.data.body
  //   // console.log(loggedInEmail)
  //   // console.log(loggedInEmail[0])
  //   let userInfo = `http://localhost:3001/users/email/${loggedInEmail}`
  //   console.log(userInfo)
  //   this.setState({
  //     email: userInfo
  //   })
  // }
  handleSubmit = (event) => {
    event.preventDefault()
  }
  handleEmailInput = async (event) => {
    this.setState({
      email: event.target.value
    })
    // const allImages = await axios.get("http://localhost:3001/images/all")
    // console.log("all Images" , allImages)
  }
  handleLogin = async () => {
    const { email, exist, id, button } = this.state
    let checkByEmailUrl = `http://localhost:3001/users/email/${email}`
    try {
      const response = await axios.get(checkByEmailUrl)
      let responseData = response.data.body
      if (responseData) {
        await axios.put(`http://localhost:3001/users/log-in/${email}`)
        return this.setState({
          exist: true,
          id: responseData.id,
          redirected: true,
          button: "login",
        })
      }
    } catch (error) {
      console.log("Error", error)
      this.setState({
        button: "login",
      })
    }
  }
  handleRegister = async () => {
    const { email, exist, id, button, defaultPhoto } = this.state
    let checkByEmailUrl = `http://localhost:3001/users/email/${email}`
    try {
      const response = await axios.get(checkByEmailUrl)
      let responseData = response.data.body
      if (responseData) {
        this.setState({
          exist: true,
        })
      }
    } catch (error) {
      console.log("Error", error)
    }
    if (exist === false) {
      let addNewUserUrl = "http://localhost:3001/users/sign-up/"
      try {
        const postNewEmailData = await axios.post(addNewUserUrl, { email: email, img_url: defaultPhoto })
        const newUserInfo = await axios.get(checkByEmailUrl)
        const newUsersId = newUserInfo.data.body.id
        this.setState({
          id: newUsersId,
          redirected: true,
          button: "register"
        })
      }
      catch (error) {
        console.log("Error", error)
        this.setState({
          button: "register"
        })
      }
    }
  }
  render() {
    const { email, exist, id, button, redirected } = this.state
    if (button === "login") {
      if (exist === true) {
        return (
          <div className="App">
            <nav>
              <Link to={`"/profile/${id}`}></Link>{" "}
              <Link to={`"/feed/${id}`}></Link>{" "}
              <Link to={'/logout/'}></Link>{" "}
            </nav>
            <Switch>
              <Route path="/feed/:id" render={
                (routeProps) => {
                  return (
                    <Feed email={email} id={id} />
                  )
                }
              } />
              <Route path="/profile/:id" render={
                (routeProps) => {
                  return (
                    <Profile email={email} id={id} />
                  )
                }
              } />
              <Route path="/logout" component={LogOut}/>
            </Switch>
            <Redirect to={`/feed/${id}`} ç />
          </div>
        );
      } else {
        return (
          <div className="App">
            <div className="AppStage">
              <h1>BunkR</h1>
              <div className="login-form">
                <form className="app_form" onSubmit={this.handleSubmit}>
                  <p>Email: </p>
                  <input className="loginInput" onChange={this.handleEmailInput} type="text" />
                  <button className="loginLogin" onClick={this.handleLogin}>Login</button>
                  <button className="loginRegister" onClick={this.handleRegister}>Register</button>
                </form>
                <p>Email Does Not Exist. Try again.</p>
              </div>
            </div>
          </div>

        );
      }
    } else if (button === "register") {
      if (exist === true) {
        return (
          <div className="App">
            <div className="AppStage">
              <h1>BunkR</h1>
              <div className="login-form">
                <form className="app_form" onSubmit={this.handleSubmit}>
                  <p>Email: </p>
                  <input className="loginInput" onChange={this.handleEmailInput} type="text" />
                  <button className="loginLogin" onClick={this.handleLogin}>Login</button>
                  <button className="loginRegister" onClick={this.handleRegister}>Register</button>
                </form>
                <p>Email is Already Registered. </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="App">
            <nav>
              <Link to={`"/profile/${id}`}></Link>{" "}
              <Link to={`"/feed/${id}`}></Link>{" "}
              <Link to={'/logout/'}></Link>{" "}
            </nav>
            <Switch>
              <Route path="/profile/:id" render={
                (routeProps) => {
                  return (
                    <Profile email={email} id={id} />
                  )
                }
              } />
              <Route path="/feed/:id" render={
                (routeProps) => {
                  return (
                    <Feed email={email} id={id} />
                  )
                }
              } />
              <Route path="/logout/" component={LogOut}/>
            </Switch>
            <Redirect to={`/profile/${id}`} />
          </div>
        );
      }
    } else if (redirected === false) {
      return (
        <div className="App">
          <div className="AppStage">
            <h1>BunkR</h1>
            <div className="login-form">
              <form className="app_form" onSubmit={this.handleSubmit}>
                <p>Email: </p>
                <input className="loginInput" onChange={this.handleEmailInput} type="text" />
                <button className="loginLogin" onClick={this.handleLogin}>Login</button>
                <button className="loginRegister" onClick={this.handleRegister}>Register</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default App
