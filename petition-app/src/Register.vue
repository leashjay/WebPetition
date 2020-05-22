<template>
  <div>
    <Nav/>
    <div>
      <div class="hero-body">
        <form class="container has-text-centered" @submit="this.registerUser">
          <div class="column is-4 is-offset-4">

            <!-- Contact -->
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Name"
                    id="name"
                    ref="name"
                    v-model="user.name"
                    @input="delayTouch($v.user.name)"
                    :class="{ 'form-group--error': $v.user.name.$error }"
                  />
                  <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  <span class="icon is-small is-right" v-if="!$v.user.name.$error">
                      <i class="fas fa-check"></i>
                    </span>
                </div>
                <div class="help is-danger" v-if="!$v.user.name.required">Name Field is required</div>
                <div class="help is-danger" v-if="!$v.user.name.alpha">Name must have at least only letters</div>
                <div class="help is-danger" v-if="!$v.user.name.minLength">Name must have atleast 04 characters</div>
              </div>
            </div>
            <div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="email"
                    placeholder="Email"
                    id="email"
                    ref="email"
                    @input="delayTouch($v.user.email)"
                    v-model="user.email"/>
                  <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  <span class="icon is-small is-right" v-if="!$v.user.email.$error">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p class="help is-danger" v-if="!$v.user.email.required">A email is required</p>
                <p class="help is-danger" v-if="!$v.user.email.email">A email is required</p>
              </div>
            </div>

            <!-- Security  -->
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left has-icons-right">
                  <input
                    class="input is-success"
                    type="password"
                    placeholder="Password"
                    id="password"
                    ref="password"
                    v-model="user.password"
                    @input="delayTouch($v.user.password)"
                  />
                  <span class="icon is-small is-left">
                      <i class="fas fa-key"></i>
                    </span>
                  <span class="icon is-small is-right" v-if="!$v.user.password.$error">
                      <i class="fas fa-check"></i>
                    </span>
                </p>

                <p class="help is-danger" v-if="!$v.user.password.required">This password is required</p>
                <p class="help is-danger" v-if="!$v.user.password.minLength">Atleast 05 characters are required</p>
              </div>

              <div class="field">
                <p class="control is-expanded has-icons-left has-icons-right">
                  <input
                    class="input is-success"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    ref="confirmPassword"
                    @input="delayTouch($v.user.repeatPassword)"
                    v-model="user.repeatPassword"
                  />
                  <span class="icon is-small is-left">
                      <i class="fas fa-key"></i>
                    </span>
                  <span class="icon is-small is-right" v-if="!$v.user.repeatPassword.$error">
                      <i class="fas fa-check"></i>
                    </span>
                </p>

                <p class="help is-danger" v-if="!$v.user.repeatPassword.required">Confirm password is required</p>
                <p class="help is-danger" v-if="!$v.user.repeatPassword.minLength">Password must have at least 5
                  letters.</p>
                <p class="help is-danger" v-if="!$v.user.repeatPassword.sameAsPassword">Passwords must be
                  identical</p>
              </div>
            </div>

            <!--Location  -->
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    class="input"
                    type="text"
                    placeholder="City"
                    id="city"
                    ref="city"
                    v-model="user.city"
                  />
                  <span class="icon is-small is-left">
                      <i class="fas fa-home"></i>
                    </span>
                </p>

                <!-- <p class="help is-warning">This password is empty</p> -->
              </div>

              <div class="field">
                <p class="control is-expanded has-icons-left has-icons-right">
                  <input
                    class="input is-success"
                    type="text"
                    placeholder="Country"
                    id="country"
                    ref="country"
                    v-model="user.country"
                  />
                  <span class="icon is-small is-left">
                      <i class="fas fa-globe"></i>
                    </span>
                  <span class="icon is-small is-right" v-if="user.country">
                      <i class="fas fa-check"></i>
                    </span>
                </p>

                <!-- <p class="help is-warning">This password is empty</p> -->
              </div>
            </div>
            <div>
              <div class="field is-grouped">
                <div class="control">
                  <button
                    class="button is-success"
                    type="submit"
                    value="Register User"
                  >
                    Submit
                  </button>
                </div>
                <div class="control">
                  <button class="button is-danger" @click="resetForm()">Cancel</button>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <home-banner/>
    <Petitions/>
  </div>
</template>

<script>
  import Vue from "vue";
  import Vuelidate from "vuelidate";
  import Petitions from "./Petitions.vue";
  import HomeBanner from "./components/homeBanner";
  import Nav from "./components/nav.vue";

  const touchMap = new WeakMap()

  const {
    required,
    minLength,
    email,
    alpha,
    sameAs
  } = require("vuelidate/lib/validators");
  Vue.use(Vuelidate);

  export default {
    name: "Register",
    props: ["register"],
    data() {
      return {
        user: {
          name: "",
          email: "",
          password: "",
          repeatPassword: "",
          city: "",
          country: ""
        }
      };
    },
    components: {
      HomeBanner,
      Petitions,
      Nav
    },
    computed: {
      userName: function () {
        return this.user.name;
      },
      userEmail: function () {
        return this.user.email;
      },
      userPassword: function () {
        return this.user.password;
      },
      userConfirmPassword: function () {
        return this.user.repeatPassword;
      },
      userCity: function () {
        return this.user.city;
      },
      userCountry: function () {
        return this.user.country;
      }
    },

    validations: {
      user: {
        name: {
          required,
          alpha,
          minLength: minLength(4)
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(5)
        },
        repeatPassword: {
          required,
          minLength: minLength(5),
          sameAsPassword: sameAs("password")
        }
      }
    },
    methods: {
      toggleNav() {
        var nav = document.querySelector('.navbar-menu');
        if (nav.className == "navbar-menu") {
          nav.className = "navbar-menu is-active";
        } else {
          nav.className = "navbar-menu";
        }
      },
      delayTouch($v) {
        $v.$reset()
        if (touchMap.has($v)) {
          clearTimeout(touchMap.get($v))
        }
        touchMap.set($v, setTimeout($v.$touch, 1000))
      },
      compileJSON: function () {
        return {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          city: this.user.city,
          country: this.user.country
        };
      },
      registerUser: function (e) {
        e.preventDefault();
        console.log("submit!");
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = "ERROR";
        } else {
          const body = this.compileJSON();
          this.$http.post("http://localhost:4941/api/v1/users/register", body)
            .then(response => {
              console.log(response);
              if (response.status === 201) {
                this.$router.push("/petitions")
              }
            });
          this.submitStatus = "PENDING";
          setTimeout(() => {
            this.submitStatus = "OK";
          }, 500);
        }
      },
      resetForm() {
        Object.keys(this.user).forEach(key => {
          this.user[key] = ''
        });
        this.$router.push("./")
      }
    }
  };
</script>
