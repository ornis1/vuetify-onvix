import Vue from 'vue';
import Router from 'vue-router';
/* eslint-disable  */
import store from '@/store/store';

Vue.use(Router);
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/TheLogin'),
    beforeEnter: (to, from, next) => {
      const id = localStorage.getItem('id');
      // если есть id редиректим на главную
      id ? next('/') : next();
    },
  },

  { path: '*', name: 'page404', component: () => import('@/views/ThePage404') },

  {
    path: '/',
    components: {
      default: () => import('@/views/TheHomeGlobal'),
      header: () => import('@/components/TheHeader/TheHeader'),
      footer: () => import('@/components/TheFooter'),
    },
    beforeEnter: (to, from, next) => {
      const id = localStorage.getItem('id');
      id ? next() : next('/login');
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/TheHome'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/TheProfile'),
      },
      {
        path: '/movie/:id',
        name: 'movie',
        component: () =>
          import('@/components/MovieDescription/MovieDescription'),
      },
      {
        path: ':type',
        name: 'result',
        component: () => import('@/views/TheResult'),
        children: [
          {
            name: 'resultWithId',
            path: ':id',
            component: () => import('@/views/TheResult'),
          },
        ],
      },
    ],
  },
];

export default new Router({
  routes,
  mode: 'history',
});
