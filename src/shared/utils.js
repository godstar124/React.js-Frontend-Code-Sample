class Utils {
  static requireAuth(store) {
    const {login} = store.getState();
    return (router, replace) => {
      return login.auth || replace('/');
    };
  }

  static universalReducer(initialState, ACTION_HANDLERS) {
    return (state = initialState, action) => {
      const handler = ACTION_HANDLERS[action.type];
      return handler ? handler(state, action) : state;
    };
  }

  static timeConverter(UnixTimestamp) {
    const date = new Date(UnixTimestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    return `${month} ${day} ${hour}`;
  }

  static notEmpty(v) {
    if (v === 0) {
      return true;
    }
    return !!v;
  }
}

export default Utils;
