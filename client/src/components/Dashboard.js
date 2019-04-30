import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

  componentDidMount(){
    this.props.getSecret()
  }

  render(){
    return (
      <div>
        This is a Dashboard component
      </div>
    );
  };
};

export default connect(null, actions)(Dashboard)