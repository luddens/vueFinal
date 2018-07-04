// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'

import Vue from 'vue'
import vueRresource from 'vue-resource'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(vueRresource)

export const store = new Vuex.Store({
  state: {
    cart: {
      total: 0,
      content: []
    },
    menu: {
      items: []
    },
    center: {
      content: '',
      allPhotos: [],
      photos: [],
      pos: 0,
      maxLoad: 20,
      maxImages: 20,
      // images: function(photos){
      //   images: function(photos){
      //   console.log(photos)
      //   return photos
      // },
      value: '0'
    }
  },
  getters: {
    menu: state => state.menu,
    cart: state => state.cart
  },
  mutations: {
    removeItem: (state, item) => {
      state.cart.content.pop(item)
      state.cart.total -= item.price
    },
    addToCart: (state, item) => {
      state.cart.content.push(item)
      state.cart.total += item.price
    },
    changeValue: state => {
      state.cart.content.forEach(item => {
        item.num = item.num + 15
      })
    },
    updateAllPrices: (state, items) => {
      state.menu.items = items
    }
  },
  actions: {
    removeFromCart: (context, payload) => {
      context.commit('removeItem', payload)
    },
    changeValue: (context, payload) => {
      // $http doesn't exist here for some reason
      return Vue.http.get('http://localhost:3000/api/')
        .then(function (response) {
          // console.log(response.body)
        })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  components: { App },
  template: '<App/>'
})
