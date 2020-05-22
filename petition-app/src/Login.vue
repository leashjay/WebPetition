<template>
  <div>
    <Nav/>
    <home-banner/>
    <div>
      <div>
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <div class="box">
                <form @submit.prevent="login()">
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="email"
                        placeholder="Email"
                        v-model="user.email"
                        @input="delayTouch($v.user.email)"
                        :class="{ 'is-danger': $v.user.email.$error }"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>

                      <span class="icon is-small is-right" v-if="!$v.user.email.$error">
                          <i class="fas fa-check"></i>
                        </span>
                    </div>
                    <p class="help is-danger" v-if="!$v.user.email.required">A email is required</p>
                    <p class="help is-danger" v-if="!$v.user.email.email">A email is required</p>
                  </div>

                  <div class="field">
                    <div class="field">
                      <p
                        class="control is-expanded has-icons-left has-icons-right"
                      >
                        <input
                          class="input"
                          type="password"
                          placeholder="Password"
                          v-model="user.password"
                          @input="delayTouch($v.user.password)"
                          :class="{ 'is-danger': $v.user.password.$error }"
                        />
                        <span class="icon is-small is-left">
                          <i class="fas fa-key"></i>
                        </span>
                        <span class="icon is-small is-right" v-if="!$v.user.password.$error">
                          <i class="fas fa-check"></i>
                        </span>
                      </p>

                      <p class="help is-danger" v-if="!$v.user.password.required">This password is required</p>
                    </div>
                  </div>

                  <button class="button is-info is-fullwidth">
                    Login <i class="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
              <p class="has-text-grey">
                <a href="../Register">Sign Up</a> &nbsp;·&nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Petitions/>
  </div>

</template>

<script>
  import Vue from "vue";
  import Petitions from "./Petitions.vue";
  import Vuelidate from "vuelidate";
  import Nav from "./components/nav.vue"
  import HomeBanner from "./components/homeBanner";

  Vue.use(Vuelidate);

  const {required, email} = require("vuelidate/lib/validators");
  const touchMap = new WeakMap()

  export default {
    name: "Login",
    data() {
      return {
        user: {
          email: "",
          password: ""
        }
      };
    },
    components: {
      HomeBanner,
      Petitions,
      Nav
    },
    validations: {
      user: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    methods: {
      login() {
        const formData = {
          email: this.user.email,
          password: this.user.password
        };

        console.log('userdata', formData);
      },
      delayTouch($v) {
        $v.$reset()
        if (touchMap.has($v)) {
          clearTimeout(touchMap.get($v))
        }
        touchMap.set($v, setTimeout($v.$touch, 1000))
      },
      toggleNav() {
        var nav = document.querySelector('.navbar-menu');
        if (nav.className == "navbar-menu") {
          nav.className = "navbar-menu is-active";
        } else {
          nav.className = "navbar-menu";
        }
      }
    },
  };
</script>
