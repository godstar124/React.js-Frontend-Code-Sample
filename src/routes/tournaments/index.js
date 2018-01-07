import {injectReducer, injectSaga} from '../../store/reducers';
import Utils from '../../shared/utils';

export default (store) => ({
  path: 'tournaments',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Tournaments = require('./tournaments.container').default;
      const reducer = require('./tournaments.module').default;
      injectReducer(store, {
        key: 'tournaments',
        reducer
      });
      injectSaga(store, require('./tournaments.module').tournamentsFetchSaga);
      cb(null, Tournaments);
    }, 'tournaments');
  },
  onEnter: Utils.requireAuth(store)
});
