import reducer from './assignUser';
import * as actionTypes from '../actions/actionTypes';

describe('assignUser reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      loading: false,
      users: []
    });
  });

  it('should an array of users to add to the project', () => {
    expect(
      reducer(
        {
          error: null,
          loading: false,
          users: null
        },
        {
          type: actionTypes.GET_PROJECT_USER_SUCCESS,
          users: [{ name: 'Test 1' }, { name: 'test 2' }]
        }
      )
    ).toEqual({
      error: null,
      loading: false,
      users: [{ name: 'Test 1' }, { name: 'test 2' }]
    });
  });

  it('should return an error upon failing to get project users', () => {
    expect(
      reducer(
        {
          loading: false,
          error: null
        },
        {
          type: actionTypes.GET_PROJECT_USER_FAIL,
          error: 'unable to fetch'
        }
      )
    ).toEqual({
      loading: false
    });
  });

  it('should return a increased list of users assigned to the project', () => {
    expect(
      reducer(
        {
          loading: false,
          error: null,
          users: [{}]
        },
        {
          type: actionTypes.ADD_PROJECT_USER_SUCCESS,
          users: [{ firstName: 'Foo', surname: 'Bar', role: 'employee' }]
        }
      )
    ).toEqual({
      users: [{ firstName: 'Foo', surname: 'Bar', role: 'employee' }],
      error: null,
      loading: false
    });
  });
});
