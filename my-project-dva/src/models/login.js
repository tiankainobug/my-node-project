
export default {

  namespace: 'login',

  state: {
    token:localStorage.getItem('token')
  },

  effects: {
    *saveToken ({payload},{call,put}){
      yield put({
        type:'save',
        payload:{token:payload}
      })
    }
  },

  reducers: {
    save(state, payload) {
      return { ...state, ...payload.payload };
    },
  },

};
