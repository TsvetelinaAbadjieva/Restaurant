import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import Dishes from './components/Dishes.vue'
import Restaurants from './components/Restaurants.vue';

Vue.use(VueRouter)

const routes = [{
        path: '*',
        redirect: 'login'
    },
    {
        path: '/',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },

    {
        path: '/restaurants',
        name: 'restaurants',
        component: Restaurants,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/restaurants/:id',
        name: 'dishes',
        component: Dishes,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dishes',
        name: 'dishes',
        component: Dishes,
        meta: {
            requiresAuth: false
        }
    },

    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    console.log('Current user', currentUser)
    let requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next('/login')
    } else {
        next();
    }
})
export default router