import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import 'babel-polyfill';

import App from 'src/App.vue';

/**
 * component
 */
import Top from 'src/component/Top.vue';

/**
 * bootstrap.css
 */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// import BootstrapVue, {
//   ModalPlugin,
//   LayoutPlugin,
//   CardPlugin,
//   VBScrollspyPlugin,
//   DropdownPlugin,
//   TablePlugin
// } from 'bootstrap-vue';
// Vue.use(BootstrapVue);
// Vue.use(LayoutPlugin);
// Vue.use(ModalPlugin);
// Vue.use(CardPlugin);
// Vue.use(VBScrollspyPlugin);
// Vue.use(DropdownPlugin);
// Vue.use(TablePlugin);

Vue.use(Router);
Vue.use(Vuex);

const router = new Router({
  mode: 'history',
  routes: [{ path: '/', component: Top }]
});

export interface i_store {
  state: {
    top: {
      time: number;
      left: string;
      sign: string;
      right: string;
      ans: string;
      result: boolean;
    };
  };
  commit: (name: string, param: any) => void;
}

const store = new Vuex.Store({
  state: {
    top: {
      time: 15,
      left: '',
      sign: '',
      right: '',
      ans: '',
      result: false
    }
  },
  mutations: {
    top_set_time(state, time) {
      state.top.time = time;
    },
    top_set_left(state, left) {
      state.top.left = left;
    },
    top_set_sign(state, sign) {
      state.top.sign = sign;
    },
    top_set_right(state, right) {
      state.top.right = right;
    },
    top_set_ans(state, ans) {
      state.top.ans = ans;
    },
    top_set_result(state, result) {
      state.top.result = result;
    }
  }
});

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
});
