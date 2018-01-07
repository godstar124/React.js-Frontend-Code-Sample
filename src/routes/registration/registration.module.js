import {call, put, takeEvery} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import HTTP from '../../shared/http';
import ApiUrls from '../../shared/api.urls';
import Utils from '../../shared/utils';
import {LOGIN_FETCH_SUCCEEDED} from '../login/login.module';
import {SNACKBAR_CHANGE_MESSAGE} from '../../core/layout.component/layout.module';

const REGISTRATION_FETCHING = 'REGISTRATION_FETCHING';
export const REGISTRATION_FETCH_FAILED = 'REGISTRATION_FETCH_FAILED';
const REGISTRATION_LOGOUT = 'REGISTRATION_LOGOUT';

export function registrationDispatch(data) {
  return {
    type: REGISTRATION_FETCHING,
    payload: data
  };
}

function* registration(action) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.REGISTRATION,
      body: action.payload,
      method: 'post'
    });
    yield call(delay, 350);

    if (res.status === 200) {
      const body = yield call(() => res.json());
      return yield put({type: LOGIN_FETCH_SUCCEEDED, token: body.token});
    }

    if (res.status === 400) {
      const body = yield call(() => res.json());
      return yield put({type: SNACKBAR_CHANGE_MESSAGE, payload: body.reason});
    }

    yield put({type: REGISTRATION_FETCH_FAILED});
  } catch (e) {
    yield put({type: REGISTRATION_FETCH_FAILED});
  }
}

export function* registrationSaga() {
  yield takeEvery(REGISTRATION_FETCHING, registration);
}

const ACTION_HANDLERS = {
  [REGISTRATION_FETCHING]: (state) => ({...state, fetching: true}),
  [REGISTRATION_FETCH_FAILED]: (state) => ({
    ...state,
    fetching: false
  }),
  [REGISTRATION_LOGOUT]: (state) => {
    return ({...state, fetching: false});
  }
};

const initialState = {
  fetching: false
};

export default Utils.universalReducer(initialState, ACTION_HANDLERS);
