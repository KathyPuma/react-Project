import React from 'react'
import App from '../App'
import axios from 'axios'

class LogOut extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <>
      <App/>
      <h4> You have been signed out.</h4>
      </>
    )
  }
}

export default LogOut;
