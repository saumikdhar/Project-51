import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
      isAuthorise: false,
      role: null
    });
  });

  it('should store user credentials upon authentication', () => {
    expect(
      reducer(
        {
          error: null,
          loading: false,
          userId: null,
          isAuthorise: false,
          role: null,
          token: null
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          role: String,
          userId: Number,
          token: String
        }
      )
    ).toEqual({
      error: null,
      loading: false,
      role: String,
      userId: Number,
      token: String,
      isAuthorise: true
    });
  });

  it('should send a error upon failing to authenticate', () => {
    expect(
      reducer(
        {
          isAuthorise: false,
          loading: false,
          error: null
        },
        {
          type: actionTypes.AUTH_FAIL,
          error: 'Email or password was incorrect!'
        }
      )
    ).toEqual({
      isAuthorise: false,
      loading: false
    });
  });

  it('should remove user credentials upon logging out', () => {
    expect(
      reducer(
        {
          token: 'fghg656FHG66sd6aGFHGkj8',
          userId: 1,
          role: 'manager'
        },
        {
          type: actionTypes.AUTH_LOGOUT
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      role: null
    });
  });
});
