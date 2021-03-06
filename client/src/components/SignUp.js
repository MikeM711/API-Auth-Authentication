import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';

import * as actions from '../actions'
import CustomInput from './CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount(){
    // Erase error messages if component mounted
    await this.props.componentMount();
  }

  async onSubmit(formData) {
    console.log('onSubmit() called')
    console.log('formData', formData)
    // we need to call some actionCreator
    await this.props.signUp(formData)
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseGoogle(res) {
    console.log('responseGoogle', res);
    await this.props.oauthGoogle(res.accessToken)
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
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
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_KEY}`}
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
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const enhance = compose(
  reduxForm({ form: 'signup' }),
  connect(mapStateToProps, actions),
)

export default enhance(SignUp);