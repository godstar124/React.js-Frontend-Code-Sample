export default Object.freeze({
  HOST: webpackGlobal['api-url'] || 'http://192.168.88.179:4001/',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  CHANGE_NAME: 'me/name',
  CHANGE_EMAIL: 'me/email',
  CHANGE_PASSWORD: 'me/password',
  GET_ME_INFO: 'me',
  GET_USERS: 'users',
  GET_TOURNAMENTS: 'tournaments',
  GET_TOURNAMENT_BY_ID: 'tournaments/:id',
  JOIN_TO_TOURNAMENT: 'tournaments/:id/join',
  LEAVE_FROM_TOURNAMENT: 'tournaments/:id/leave',
  GET_CLUBS_BY_TOURNAMENT: 'tournaments/:id/clubs'
});
