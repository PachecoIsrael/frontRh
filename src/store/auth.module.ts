import authService from '../services/auth/auth.service';
const dado:any = localStorage.getItem('user')
const user:any = JSON.parse(dado);
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }:any, user: any) {
      return authService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }:any) {
      authService.logout();
      commit('logout');
    },
    register({ commit }:any, user: any) {
      return authService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state: any, user: any) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state: any) {
      state.status.loggedIn = false;
    },
    registerFailure(state: any) {
      state.status.loggedIn = false;
    }
  },
};