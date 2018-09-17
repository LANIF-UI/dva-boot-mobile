import {} from '../service';

export default {
  namespace: 'home',

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/home') {
          dispatch({
            type: 'global/getMenu'
          });
        }
      });
    }
  },

  state: {},

  effects: {},

  reducers: {}
};
