import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions'
import CustomInput from './CustomInput';

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

            <button type="submit" className="btn btn-primary">Sign Up</button>

          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>
            <button className="btn btn-default">Google</button>
          </div>
        </div>
      </div>
    );
  };
};

const enhance = compose(
  reduxForm({ form: 'signup' }),
  connect(null, actions),
)

export default enhance(SignUp);