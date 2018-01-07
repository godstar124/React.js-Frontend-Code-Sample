import {call, put, takeEvery} from 'redux-saga/effects';

import HTTP from '../../shared/http';
import ApiUrls from '../../shared/api.urls';
import Utils from '../../shared/utils';

import {
  CHANGE_EMAIL_FETCHING,
  CHANGE_PASSWORD_FETCHING,
  fetchChangeEmail,
  fetchChangePassword
} from './profile.modal.module';

const GET_ME_INFO_FETCHING = 'GET_ME_INFO_FETCHING';
const GET_ME_INFO_FETCH_SUCCEEDED = 'GET_ME_INFO_FETCH_SUCCEEDED';
export const GET_ME_INFO_FETCH_FAILED = 'GET_ME_INFO_FETCH_FAILED';

const CHANGE_NAME_FETCHING = 'CHANGE_NAME_FETCHING';
const CHANGE_NAME_FETCH_SUCCEEDED = 'CHANGE_NAME_FETCH_SUCCEEDED';
export const CHANGE_NAME_FETCH_FAILED = 'CHANGE_NAME_FETCH_FAILED';

export const changeName = (name) => {
  return {
    type: CHANGE_NAME_FETCHING,
    payload: name
  };
};

function* fetchChangeName({payload}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.CHANGE_NAME,
      method: 'put',
      body: {
        name: payload
      }
    });
    if (res.status === 200) {
      return yield put({type: CHANGE_NAME_FETCH_SUCCEEDED});
    }
    yield put({type: CHANGE_NAME_FETCH_FAILED});
  } catch (e) {
    yield put({type: CHANGE_NAME_FETCH_FAILED});
  }
}

export const getMeInfo = () => {
  return {
    type: GET_ME_INFO_FETCHING
  };
};

function* fetchMeInfo() {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.GET_ME_INFO,
      method: 'get'
    });
    if (res.status === 200) {
      const body = yield call(() => res.json());
      return yield put({type: GET_ME_INFO_FETCH_SUCCEEDED, payload: body.user});
    }
    yield put({type: GET_ME_INFO_FETCH_FAILED});
  } catch (e) {
    yield put({type: GET_ME_INFO_FETCH_FAILED});
  }
}

export function* profileFetchSaga() {
  yield takeEvery(GET_ME_INFO_FETCHING, fetchMeInfo);
  yield takeEvery(CHANGE_NAME_FETCHING, fetchChangeName);
  yield takeEvery(CHANGE_EMAIL_FETCHING, fetchChangeEmail);
  yield takeEvery(CHANGE_PASSWORD_FETCHING, fetchChangePassword);
}

const ACTION_HANDLERS = {
  [GET_ME_INFO_FETCHING]: (state) => ({...state, fetching: true}),
  [GET_ME_INFO_FETCH_SUCCEEDED]: (state, action) => ({...state, fetching: false, user: action.payload})
};

const initialState = {
  user: {},
  fetching: false
};

export default Utils.universalReducer(initialState, ACTION_HANDLERS);
