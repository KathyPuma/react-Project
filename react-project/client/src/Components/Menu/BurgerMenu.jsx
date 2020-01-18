import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import './Burger.css'
import Profile from '../Profile'


import styles from './Burgerstyles'

class BurgerMenu extends Component {
    showSettings(event) {
        // event.preventDefault();
    }
    render() {
        return (
            <div id="outer-container" className="outer-container" >
                <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} left width={"20%"} styles={styles} disableAutoFocus>
                    <main id="page-wrap">
                        <Link to="/profile" className="menu-item" id="profile-link">Profile</Link>
                            <br />
                            <Link to="/feed" className="menu-item" id="feed-link">Feed</Link>
                            <br />
                            <br />
                            <Link to="/login" className="menu-item" id="feed-link">Logout</Link>
                            <Switch>
                                <Route path="/profile" component={Profile} />
                                <Route path="/log-out"/>
                            </Switch>
                        </main>
                </Menu>
            </div>
                )
            }
        }
export default BurgerMenu;