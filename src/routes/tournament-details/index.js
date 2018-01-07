import {injectReducer, injectSaga} from '../../store/reducers';
import Utils from '../../shared/utils';

export default (store) => ({
  path: 'tournaments/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Tournaments = require('./tournament-details.container').default;
      const reducer = require('./tournament-details.module').default;
      injectReducer(store, {
        key: 'tournamentDetails',
        reducer
      });
      injectSaga(store, require('./tournament-details.module').tournamentDetailsFetchSaga);
      cb(null, Tournaments);
    }, 'tournamentDetails');
  },
  onEnter: Utils.requireAuth(store)
});
