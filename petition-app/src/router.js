import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './Home.vue'
import Register from "./Register"
import Login from "./Login"
import Users from './Users.vue'
import Petitions from './Petitions.vue'
import Petition from './components/Petition.vue'
import SocialShare from './components/socialShare.vue'

import CreateOrEdit from './components/CreateOrEdit.vue';
import Profile from './components/Profile.vue';
import CreatePetition from './components/createPetition.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  component: {
    App
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => resolve(Home),
      children: [
        {
          path: '',
          redirect: 'petitions'
        },
        {
          path: 'petitions',
          component: Petitions
        },
        {
          path: 'create',
          component: CreateOrEdit
        },
        {
          path: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/users/:userId",
      name: "user",
      component: Users
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/petitions",
      name: "petitions",
      component: Petitions
    },
    {
      path: "/petition-create",
      name: "createPetition",
      component: CreatePetition
    },
    {
      path: "/petitions/:id",
      name: "petition",
      component: Petition
    },
    {
      path: "/social-share",
      name: "socialShare",
      component: SocialShare
    }


  ]
});


export default router
