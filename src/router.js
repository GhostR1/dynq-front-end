import Vue from 'vue'
import Router from 'vue-router'
import JWT from 'jsonwebtoken'
import axios from 'axios'

Vue.use(Router)

const router = new Router( {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            meta: {layout: 'login', isAuth: true},
            component: () => import('./views/Login')
        },
        {
            path: '/admin-employee',
            name: 'admin-employee',
            meta: {layout: 'admin-employee', requireAuth: true},
            component: () => import('./views/Admin-employee')
        },
        {
            path: '/admin-client',
            name: 'admin-client',
            meta: {layout: 'admin-client', requireAuth: true},
            component: () => import('./views/Admin-client')
        },
        {
            path: '/admin-problem',
            name: 'admin-problem',
            meta: {layout: 'admin-problem', requireAuth: true},
            component: () => import('./views/Admin-problem')
        }
    ]
})
router.beforeEach((to, from, next) => {
    const isAuth = to.matched.some(record => record.meta.isAuth)
    if(isAuth) {
        if(localStorage.jwt !== "") {
            let id = JWT.decode(localStorage.jwt)._id;
            axios
                .get("http://localhost:3000/api/admin/" + id)
                .then(response => {
                    if(response.status === 200) {
                        next('/admin-employee')
                    }
                })
                .catch(err => {
                    if(err.response.status === 404) {
                        axios
                            .get("http://localhost:3000/api/employee/" + id)
                            .then(response => {
                                if(response.status === 200) {
                                    next('/employee')
                                }
                            })
                            .catch(err => {
                                if(err.response.status === 404) {
                                    alert('You have no rights! Sign in first!')
                                    next('/')
                                }
                            })
                    }
                })
        } else {
            next()
        }
    } else {
        const requireAuth = to.matched.some(record => record.meta.requireAuth)
        if (requireAuth) {
            if(localStorage.jwt !== "") {
                let id = JWT.decode(localStorage.jwt)._id;
                axios
                    .get("http://localhost:3000/api/admin/" + id)
                    .then(response => {
                        if(response.status === 200) {
                            next()
                        }
                    })
                    .catch(err => {
                        if(err.response.status === 404) {
                            axios
                                .get("http://localhost:3000/api/employee/" + id)
                                .then(response => {
                                    if(response.status === 200) {
                                        next()
                                    }
                                })
                                .catch(err => {
                                    if(err.response.status === 404) {
                                        alert('You have no rights! Sign in first!')
                                        next('/')
                                    }
                                })
                        }
                    })
            } else {
                alert('Please, sign-in first!')
                next('/')
            }
        } else {
            next()
        }
    }
})
export default router;
