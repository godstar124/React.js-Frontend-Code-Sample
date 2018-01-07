import {call, put, takeEvery} from 'redux-saga/effects';

import HTTP from '../../shared/http';
import ApiUrls from '../../shared/api.urls';
import Utils from '../../shared/utils';

export const CHANGE_EMAIL_FETCHING = 'CHANGE_EMAIL_FETCHING';
const CHANGE_EMAIL_FETCH_SUCCEEDED = 'CHANGE_EMAIL_FETCH_SUCCEEDED';
export const CHANGE_EMAIL_FETCH_FAILED = 'CHANGE_EMAIL_FETCH_FAILED';

export const CHANGE_PASSWORD_FETCHING = 'CHANGE_PASSWORD_FETCHING';
const CHANGE_PASSWORD_FETCH_SUCCEEDED = 'CHANGE_PASSWORD_FETCH_SUCCEEDED';
export const CHANGE_PASSWORD_FETCH_FAILED = 'CHANGE_PASSWORD_FETCH_FAILED';

export const changeEmail = (email, pass) => {
  return {
    type: CHANGE_EMAIL_FETCHING,
    email,
    pass
  };
};

export function* fetchChangeEmail({email, pass}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.CHANGE_EMAIL,
      method: 'put',
      body: {
        email,
        password: pass
      }
    });
    if (res.status === 200) {
      return yield put({type: CHANGE_EMAIL_FETCH_SUCCEEDED});
    }
    yield put({type: CHANGE_PASSWORD_FETCH_FAILED});
  } catch (e) {
    yield put({type: CHANGE_PASSWORD_FETCH_FAILED});
  }
}

export const changePassword = (opass, npass) => {
  return {
    type: CHANGE_PASSWORD_FETCHING,
    opass,
    npass
  };
};

export function* fetchChangePassword({opass, npass}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.CHANGE_PASSWORD,
      method: 'put',
      body: {
        oldPassword: opass,
        newPassword: npass
      }
    });
    if (res.status === 200) {
      return yield put({type: CHANGE_PASSWORD_FETCH_SUCCEEDED});
    }
    yield put({type: CHANGE_PASSWORD_FETCH_FAILED});
  } catch (e) {
    yield put({type: CHANGE_PASSWORD_FETCH_FAILED});
  }
}
