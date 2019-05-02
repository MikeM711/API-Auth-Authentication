import axios from 'axios'
import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_ERROR, 
  AUTH_SIGN_IN, 
  COMPONENT_MOUNT, 
  DASHBOARD_GET_DATA } from './types';
/*
  ActionCreators -> create/return Actions ({ }) -> dispatched -> middlewares -> reducers
*/

export const oauthGoogle = data => {
  return async dispatch => {
    console.log('we received', data)
    const res = await axios.post('/users/oauth/google', {
      access_token: data
    });

    console.log('res', res)

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}
 

// The signUp action creator
export const signUp = (data) => {
  /*
    Step 1. Use the data and to make HTTP request to BE and send it along [X]
    Step 2. Take the BE's response (jwtToken is here now!) [X]
    Step 3. Dispatch user just signed up (with payload - jwtToken) [X]
    Step 4. Save the jwtToken into our localStorage [X]
  */
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called')
      const res = await axios.post('http://localhost:5000/users/signup', data)

      console.log('res', res);
      console.log('[ActionCreator] signUp dispatched an action')

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch(err) {
      console.log('[ActionCreator] signUp dispatched an action')

      if(err.response.data.details){
        var signUpErr = err.response.data.details[0].message
      } else if(err.response.data.error) {
        signUpErr = err.response.data.error
      } else {
        signUpErr = "Invalid Credentials"
      }
      
      dispatch ({
        type: AUTH_ERROR,
        payload: signUpErr
      });
    }
  }
}

// The signIn action creator
export const signIn = (data) => {
  /*
    Step 1. Use the data and to make HTTP request to BE and send it along [X]
    Step 2. Take the BE's response (jwtToken is here now!) [X]
    Step 3. Dispatch user just signed up (with payload - jwtToken) [X]
    Step 4. Save the jwtToken into our localStorage [X]
  */
  return async dispatch => {
    try {
      console.log('[ActionCreator] signIn called')
      const res = await axios.post('http://localhost:5000/users/signin', data)

      console.log('res', res);
      console.log('[ActionCreator] signIn dispatched an action')

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch(err) {
      console.log('[ActionCreator] signIn dispatched an action')

      console.log(err.response)
      console.log('err',err)

      if(err.response.data.details){
        var signInErr = err.response.data.details[0].message
      } else if(err.response.data) {
        signInErr = err.response.data
      } else {
        signInErr = "Invalid Credentials"
      }

      dispatch ({
        type: AUTH_ERROR,
        // Typically, you would want to catch an axios error and display it below, and NOT guess what the error is
        payload: signInErr
      });
    }
  }
}

export const getSecret = () => {
  return async dispatch => {
    try {

      // When Dashboard mounts, it does not successfully go through axios
      // Unsuccessful GET of secret happens when headers are not set properly to the JWT token value
      console.log('[ActionCreator] Trying to get BE\'s secret')
      console.log('headers: ', axios.defaults.headers.common['Authorization'])
      const res = await axios.get('http://localhost:5000/users/secret')

      console.log('res', res)
      console.log('Dispatching Secret')

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret
      })

    }
    catch(err) {
      console.log('err', err)
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: '',
    })
  };
}

// step 1 actionCreator, step 2 - create a new type
export const componentMount = () => {
  return async dispatch => {

    dispatch({
      type: COMPONENT_MOUNT,
      payload: '',
    })
  };
}