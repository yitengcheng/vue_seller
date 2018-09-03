// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { router } from './route/menu';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

let app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

Vue.use(app);
