import {call, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import ApiUrls from '../../shared/api.urls';
import HTTP from '../../shared/http';
import {SNACKBAR_CHANGE_MESSAGE} from '../../core/layout.component/layout.module';
import {TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER} from './tournament-details.module';

export const CLUBS_FETCHING = 'CLUBS_FETCHING';
const CLUBS_FETCH_SUCCEEDED = 'CLUBS_FETCH_SUCCEEDED';

export const CLUB_SELECTED_FETCHING = 'CLUB_SELECTED_FETCHING';
export const CLUB_SELECTED_FETCH_FAILED = 'CLUB_SELECTED_FETCH_FAILED';

const CHANGE_CLUB_MODAL = 'CHANGE_CLUB_MODAL';

export function* fetchAddClubInTournament({payload, clubId}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.JOIN_TO_TOURNAMENT.replace(':id', payload),
      method: 'post',
      body: {
        clubId
      }
    });
    yield call(delay, 350);
    if (res.status === 201) {
      return yield put({type: TOURNAMENT_DETAILS_FETCHING_WITHOUT_SPINNER, payload});
    }
    return yield put({type: CLUB_SELECTED_FETCH_FAILED});
  } catch (e) {
    yield put({type: CLUB_SELECTED_FETCH_FAILED});
  }
}

export const addClubToTournament = (tournamentId, clubId) => ({
  type: CLUB_SELECTED_FETCHING,
  payload: tournamentId,
  clubId
});

export function* fetchClubsByTournament({payload}) {
  try {
    const res = yield call(HTTP.query, {
      url: ApiUrls.GET_CLUBS_BY_TOURNAMENT.replace(':id', payload),
      method: 'get'
    });
    yield call(delay, 350);
    if (res.status === 200) {
      const body = yield call(() => res.json());
      if (body.clubs.length) {
        return yield put({type: CLUBS_FETCH_SUCCEEDED, payload: body.clubs});
      }
      return yield put({type: SNACKBAR_CHANGE_MESSAGE, payload: 'At this tournament there are no available clubs.'});
    }
    return yield put({type: SNACKBAR_CHANGE_MESSAGE, payload: 'Very sorry, server error.'});
  } catch (e) {
    yield put({type: SNACKBAR_CHANGE_MESSAGE, payload: 'Very sorry, server error.'});
  }
}

export const changeClubModalVisible = (visible, tournamentId) => {
  if (tournamentId) {
    return {type: CLUBS_FETCHING, payload: tournamentId};
  }
  return {
    type: CHANGE_CLUB_MODAL,
    payload: visible
  };
};

export const ACTION_HANDLERS = {
  [CLUBS_FETCH_SUCCEEDED]: (state, action) => ({...state, clubs: action.payload, clubModalOpen: true}),
  [CHANGE_CLUB_MODAL]: (state, action) => ({...state, clubModalOpen: action.payload})
};
