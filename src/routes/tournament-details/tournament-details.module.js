import {call, put, takeEvery} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import HTTP from '../../shared/http';
import ApiUrls from '../../shared/api.urls';
import Utils from '../../shared/utils';
import {
  CLUBS_FETCHING,
  CLUB_SELECTED_FETCHING,
  fetchClubsByTournament,
  fetchAddClubInTournament,
  ACTION_HANDLERS as clubModalHandler
} from './clubs.modal.module';

const TOURNAMENT_DETAILS_FETCHING = 'TOURNAMENT_DETAILS_FETCHING';
export const TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER = 'TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER';
const TOURNAMENT_DETAILS_FETCH_SUCCEEDED = 'TOURNAMENT_DETAILS_FETCH_SUCCEEDED';
export const TOURNAMENT_DETAILS_FETCH_FAILED = 'TOURNAMENT_DETAILS_FETCH_FAILED';

const LEAVE_FETCHING = 'LEAVE_FETCHING';
export const LEAVE_FETCH_FAILED = 'LEAVE_FETCH_FAILED';

export const getTournamentDetails = (id) => {
  return {
    type: TOURNAMENT_DETAILS_FETCHING,
    payload: id
  };
};

function* fetchTournamentDetails({payload}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.GET_TOURNAMENT_BY_ID.replace(':id', payload),
      method: 'get'
    });
    yield call(delay, 350);

    if (res.status === 200) {
      const body = yield call(() => res.json());
      return yield put({type: TOURNAMENT_DETAILS_FETCH_SUCCEEDED, payload: body.tournament});
    }
    return yield put({type: TOURNAMENT_DETAILS_FETCH_FAILED});
  } catch (e) {
    return yield put({type: TOURNAMENT_DETAILS_FETCH_FAILED});
  }
}

export const leave = (id) => {
  return {
    type: LEAVE_FETCHING,
    payload: id
  };
};

function* fetchLeave({payload}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.LEAVE_FROM_TOURNAMENT.replace(':id', payload),
      method: 'post'
    });
    if (res.status === 204) {
      return yield put({type: TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER, payload});
    }
    return yield put({type: LEAVE_FETCH_FAILED});
  } catch (e) {
    return yield put({type: LEAVE_FETCH_FAILED});
  }
}

export function* tournamentDetailsFetchSaga() {
  yield takeEvery(TOURNAMENT_DETAILS_FETCHING, fetchTournamentDetails);
  yield takeEvery(TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER, fetchTournamentDetails);
  yield takeEvery(CLUBS_FETCHING, fetchClubsByTournament);
  yield takeEvery(CLUB_SELECTED_FETCHING, fetchAddClubInTournament);
  yield takeEvery(LEAVE_FETCHING, fetchLeave);
}

const ACTION_HANDLERS = {
  [TOURNAMENT_DETAILS_FETCHING]: (state) => ({...state, fetching: true}),
  [TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER]: (state) => ({...state, clubModalOpen: false}),
  [TOURNAMENT_DETAILS_FETCH_SUCCEEDED]: (state, action) => ({
    ...state,
    fetching: false,
    tournament: action.payload
  }),
  [TOURNAMENT_DETAILS_FETCH_FAILED]: (state) => ({
    ...state,
    fetching: false
  }),
  ...clubModalHandler
};

const initialState = {
  tournament: {},
  clubs: [],
  clubModalOpen: false,
  fetching: false
};

export default Utils.universalReducer(initialState, ACTION_HANDLERS);
