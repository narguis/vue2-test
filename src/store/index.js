import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customers: [],
  },
  getters: {
    queriedCustomers: (state) => (searchQuery) => {
      if (!searchQuery) return state.customers;

      return state.customers.filter((customer) => {
        const fullName = `${customer.name.split(" ")[0]} ${
          customer.name_2.split(" ")[0]
        }`;
        return (
          customer.datasource_id
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    },
  },
  mutations: {
    setCustomers(state, payload) {
      state.customers = payload;
    },
  },
  actions: {
    async loadCustomers({ commit }) {
      try {
        const response = await axios.get("/mock customers json.json");
        const customers = response.data.result || [];
        commit("setCustomers", customers);
      } catch (error) {
        console.error("Error loading customers: ", error);
      }
    },
  },
  modules: {},
});
