import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddProduct from '../views/AddProduct.vue'
import Customer from '../views/Customer.vue'
import SignInForm from '../views/SignInForm.vue'
import Profile from '../views/Profile.vue'
Vue.use(VueRouter)

import {   
  getAuth, 
  onAuthStateChanged
  } from "firebase/auth"; 


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    
  },
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct,
    meta: { 
      requiresAuth: true, 
    },
  },
  {
    path: '/Customer',
    name: 'Customer',
    component: Customer,
    meta: { 
      requiresAuth: true, 
    },
  },
  { path: "/signinform",     
    name: "SignInForm",     
    component: SignInForm
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { 
      requiresAuth: true, 
    },
  },     
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:"history",
  routes
});

router.beforeEach((to, from, next) => {   
  if (to.matched.some((record) => record.meta.requiresAuth)) {       
    const auth = getAuth();       
    onAuthStateChanged(auth, (user) => {         
      if (user) {           
        next();         
      } else {           
          next({ path: "/signinform" }); 
        } 
      });   
  } else {     
    next(); 
  } 
}); 


export default router
