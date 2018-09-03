import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

let menu = [
  { path: '/', redirect: '/goods' },
  { path: '/goods', component: goods, name: '商品' },
  { path: '/ratings', component: ratings, name: '评论' },
  { path: '/seller', component: seller, name: '商家' }
];

Vue.use(VueRouter);
Vue.use(VueResource);

export const router = new VueRouter({
  routes: menu,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});
