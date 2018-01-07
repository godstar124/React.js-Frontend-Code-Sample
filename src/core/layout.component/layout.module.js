import Utils from '../../shared/utils';
import {LOGIN_LOGOUT, LOGIN_FETCH_FAILED} from '../../routes/login/login.module';
import {TOURNAMENT_DETAILS_FETCH_FAILED, LEAVE_FETCH_FAILED} from '../../routes/tournament-details/tournament-details.module';
import {CLUB_SELECTED_FETCH_FAILED} from '../../routes/tournament-details/clubs.modal.module';
import {TOURNAMENTS_FETCH_FAILED} from '../../routes/tournaments/tournaments.module';
import {REGISTRATION_FETCH_FAILED} from '../../routes/registration/registration.module';
import {GET_ME_INFO_FETCH_FAILED} from '../../routes/profile/profile.module';
import {CHANGE_EMAIL_FETCH_FAILED, CHANGE_PASSWORD_FETCH_FAILED} from '../../routes/profile/profile.modal.module';

const CORE_LAYOUT_CHANGE_DRAWER_STATE = 'CORE_LAYOUT_CHANGE_DRAWER_STATE';
export const SNACKBAR_CHANGE_MESSAGE = 'SNACKBAR_CHANGE_MESSAGE';

export function changeSnackBarMessage(msg) {
  return {
    type: SNACKBAR_CHANGE_MESSAGE,
    payload: msg
  };
}

export function changeDrawerState(state) {
  return {
    type: CORE_LAYOUT_CHANGE_DRAWER_STATE,
    payload: state
  };
}

const initialState = {
  drawerState: false,
  snackMessage: ''
};

const userMessage = (msg) => (state) => ({...state, snackMessage: msg});

const ACTION_HANDLERS = {
  [CORE_LAYOUT_CHANGE_DRAWER_STATE]: (state, action) =>
    (typeof action.payload === 'boolean' ? {...state, drawerState: action.payload} : {...state, drawerState: !state.drawerState}),
  [LOGIN_LOGOUT]: (state) => ({...state, drawerState: false}),
  [SNACKBAR_CHANGE_MESSAGE]: (state, action) => ({...state, snackMessage: action.payload}),
  [TOURNAMENT_DETAILS_FETCH_FAILED]: userMessage('Server error'),
  [TOURNAMENTS_FETCH_FAILED]: userMessage('Server error'),
  [LOGIN_FETCH_FAILED]: userMessage('Login error. Please check you credentials'),
  [REGISTRATION_FETCH_FAILED]: userMessage('Registration error. Please check you credentials'),
  [LEAVE_FETCH_FAILED]: userMessage('Error, leaving fail.'),
  [CLUB_SELECTED_FETCH_FAILED]: userMessage('Error join with this club.'),
  [GET_ME_INFO_FETCH_FAILED]: userMessage('Error load user.'),
  [CHANGE_EMAIL_FETCH_FAILED]: userMessage('Error update email.'),
  [CHANGE_PASSWORD_FETCH_FAILED]: userMessage('Error update password.')
};

export default Utils.universalReducer(initialState, ACTION_HANDLERS);
