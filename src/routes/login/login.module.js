import {call, put, takeEvery} from 'redux-saga/effects';

import HTTP from '../../shared/http';
import ApiUrls from '../../shared/api.urls';
import storage from '../../shared/storage';
import Utils from '../../shared/utils';

const LOGIN_FETCHING = 'LOGIN_FETCHING';
export const LOGIN_FETCH_SUCCEEDED = 'LOGIN_FETCH_SUCCEEDED';
export const LOGIN_FETCH_FAILED = 'LOGIN_FETCH_FAILED';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

export function logout() {
  return {
    type: LOGIN_LOGOUT
  };
}

export function loginDispatch(credentials) {
  return {
    type: LOGIN_FETCHING,
    credentials
  };
}

function* login(action) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.LOGIN,
      body: action.credentials,
      method: 'post'
    });
    if (res.status === 200) {
      const body = yield call(() => res.json());
      return yield put({type: LOGIN_FETCH_SUCCEEDED, token: body.token});
    }
    yield put({type: LOGIN_FETCH_FAILED});
  } catch (e) {
    yield put({type: LOGIN_FETCH_FAILED});
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN_FETCHING, login);
}

const ACTION_HANDLERS = {
  [LOGIN_FETCHING]: (state) => ({...state, fetching: true}),
  [LOGIN_FETCH_SUCCEEDED]: (state, action) => {
    storage().setItem('auth_token', action.token);
    return ({...state, auth: true, fetching: false});
  },
  [LOGIN_FETCH_FAILED]: (state) => ({
    ...state,
    fetching: false
  }),
  [LOGIN_LOGOUT]: (state) => {
    storage().removeItem('auth_token');
    return ({...state, auth: false});
  }
};

const initialState = {
  auth: !!storage().getItem('auth_token'),
  fetching: false,
  userMessage: ''
};

export default Utils.universalReducer(initialState, ACTION_HANDLERS);
