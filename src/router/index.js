import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Edit from '@/views/Edit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:id',
    name: 'edit',
    component: Edit,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
