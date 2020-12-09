import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const apiUrl = 'http://localhost:9913';

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    getTrobls() {
      return axios
        .post(`${apiUrl}/api/facilities/v1/trobls`)
        .then((response) => {
          console.log(response);
        });
    },
  },
  modules: {
  },
});
