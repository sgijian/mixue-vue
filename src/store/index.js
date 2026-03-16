// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedStore: null,
    menuItems: [],
    categories: [],
    orderItems: [],
    user: null, // 用户信息存储在这里
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    setSelectedStore(state, store) {
      state.selectedStore = store;
    },
    setMenuItems(state, items) {
      state.menuItems = items;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setOrderItems(state, items) {
      state.orderItems = items;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const validUsers = [
            { 
              username: 'admin', 
              password: '123456', 
              avatar: '/mxt.png', 
              snowCoins: 500, 
              coupons: 3 
            },
            { 
              username: 'xlw', 
              password: '123456', 
              avatar: '/mainselected.jpg', 
              snowCoins: 300, 
              coupons: 2 
            },
          ];
          const user = validUsers.find(u => u.username === credentials.username && u.password === credentials.password);
          if (user) {
            commit('SET_USER', user);
            resolve();
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
    },
    logout({ commit }) {
      commit('SET_USER', null);
    },
    setSelectedStore({ commit }, store) {
      commit('setSelectedStore', store);
    },
    loadMenuItems({ commit, state }, storeId) {
      fetch(`/data.json`)
        .then(response => response.json())
        .then(data => {
          const store = data.stores.find(s => s.id === storeId);
          const types = data.types;
          const menuItems = [];
          const categories = [];

          types.forEach(type => {
            categories.push({ id: type.products[0].categoryId, name: type.name });
            type.products.forEach(product => {
              if (product.storeId === storeId) {
                menuItems.push(product);
              }
            });
          });

          commit('setMenuItems', menuItems);
          commit('setCategories', categories);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    setOrderItems({ commit }, items) {
      commit('setOrderItems', items);
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
  },
});