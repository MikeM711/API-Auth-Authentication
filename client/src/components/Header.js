import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions'

class Header extends Component {
  
  signOut = () => {
    console.log('signout got called')
    this.props.signOut();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">CodeWorkr API Auth</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">

            {!this.props.isAuth ?
              ([<li className="nav-item" key="signup">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>,
                <li className="nav-item" key="signin">
                  <Link to="/signin" className="nav-link">Sign In</Link>
                </li>]
              ) : (null)}

            {this.props.isAuth ? (
                <li className="nav-item">
                  <Link to="/signout" className="nav-link" onClick={this.signOut}>Sign Out</Link>
                </li>
            ) : (null)}

          </ul>
        </div>
      </nav>
    );
  };
};

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(Header);