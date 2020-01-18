import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import './Burger.css'
import Profile from '../Profile'
import Feed from '../Feed'
// import LogOut from '../LogOut';
import LogOut from '../Logout'

import styles from './Burgerstyles'

class BurgerMenu extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.id
        }
    }
    showSettings(event) {
        // event.preventDefault();
    }
    render() {
        const { id } = this.state
        return (
            <div id="outer-container" className="outer-container" >
                <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} left width={"20%"} styles={styles} disableAutoFocus>
                    <main id="page-wrap">
                        <Link to={`../profile/${id}`} className="menu-item" id="profile-link">Profile</Link>
                        <br />
                        <Link to={`../feed/${id}`} className="menu-item" id="feed-link">Feed</Link>
                        <br />
                        <br />
                        <Link to={`../logout`} className="menu-item" id="feed-link">Logout</Link>
                        <Switch>
                            <Route path="../profile/:id" component={Profile} />
                            <Route path="../logout" component={LogOut} />
                        </Switch>
                    </main>
                </Menu>
            </div>
        )
    }
}
export default BurgerMenu;
