import axios from 'axios'
import { AUTH_SIGN_UP, AUTH_ERROR } from './types';
/*
  ActionCreators -> create/return Actions ({ }) -> dispatched -> middlewares -> reducers
*/

// The signUp action creator
export const signUp = (data) => {
  /*
    Step 1. Use the data and to make HTTP request to BE and send it along [X]
    Step 2. Take the BE's response (jwtToken is here now!) [X]
    Step 3. Dispatch user just signed up (with payload - jwtToken) [X]
    Step 4. Save the jwtToken into our localStorage [X]
  */
  return dispatch => {
    console.log('[ActionCreator] signUp called')
    axios.post('http://localhost:5000/users/signup', data)
      .then(res => {
        console.log('res',res);
        console.log('[ActionCreator] signUp dispatched an action')

        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);

      })
      .catch(err => {
        console.log('[ActionCreator] signUp dispatched an action')
        dispatch ({
          type: AUTH_ERROR,
          payload: 'Email is already in use'
        });

      });
  }
}