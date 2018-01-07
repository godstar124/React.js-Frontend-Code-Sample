import {injectReducer, injectSaga} from '../../store/reducers';
import Utils from '../../shared/utils';

export default (store) => ({
  path: 'profile',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Tournaments = require('./profile.container').default;
      const reducer = require('./profile.module').default;
      injectReducer(store, {
        key: 'profile',
        reducer
      });
      injectSaga(store, require('./profile.module').profileFetchSaga);
      cb(null, Tournaments);
    }, 'profile');
  },
  onEnter: Utils.requireAuth(store)
});
