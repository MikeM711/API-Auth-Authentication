import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';

import * as actions from '../actions'
import CustomInput from './CustomInput';
import config from '../config'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (formData) => {
    console.log('onSubmit() called')
    console.log('formData', formData)
    // we need to call some actionCreator
    this.props.signUp(formData)
  }

  responseGoogle = (res) => {
    console.log('responseGoogle', res);
  }

  render() {
    // We have access to handleSubmit because of 'redux-form'
    const { handleSubmit } = this.props
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput} />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="yoursuperpassword"
                component={CustomInput} />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>) : (null)}

            <button type="submit" className="btn btn-primary">Sign Up</button>

          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>
            
            <GoogleLogin
              clientId={config.oauth.google.clientID}
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  // state is "Redux State"
  return {
    errorMessage: state.auth.errorMessage
  }
}

const enhance = compose(
  reduxForm({ form: 'signup' }),
  connect(mapStateToProps, actions),
)

export default enhance(SignUp);