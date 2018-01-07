import {call, put, takeEvery} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import HTTP from '../../shared/http';
import ApiUrls from '../../shared/api.urls';
import Utils from '../../shared/utils';

const TOURNAMENTS_FETCHING = 'TOURNAMENTS_FETCHING';
const TOURNAMENTS_FETCH_SUCCEEDED = 'TOURNAMENTS_FETCH_SUCCEEDED';
export const TOURNAMENTS_FETCH_FAILED = 'TOURNAMENTS_FETCH_FAILED';

export const getTournaments = () => {
  return {
    type: TOURNAMENTS_FETCHING
  };
};

function* fetchTournaments() {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.GET_TOURNAMENTS,
      method: 'get'
    });
    yield call(delay, 350);
    if (res.status === 200) {
      const body = yield call(() => res.json());
      return yield put({type: TOURNAMENTS_FETCH_SUCCEEDED, payload: body.tournaments});
    }
    yield put({type: TOURNAMENTS_FETCH_FAILED});
  } catch (e) {
    yield put({type: TOURNAMENTS_FETCH_FAILED});
  }
}

export function* tournamentsFetchSaga() {
  yield takeEvery(TOURNAMENTS_FETCHING, fetchTournaments);
}

const ACTION_HANDLERS = {
  [TOURNAMENTS_FETCHING]: (state) => ({...state, fetching: true}),
  [TOURNAMENTS_FETCH_SUCCEEDED]: (state, action) => {
    return ({
      ...state,
      tournaments: action.payload,
      fetching: false
    });
  },
  [TOURNAMENTS_FETCH_FAILED]: (state) => ({
    ...state,
    fetching: false
  })
};

const initialState = {
  tournaments: [],
  fetching: false
};

export default Utils.universalReducer(initialState, ACTION_HANDLERS);

