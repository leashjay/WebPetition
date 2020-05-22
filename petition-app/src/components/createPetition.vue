<template>
  <div class="hero-body">
    <form class="container has-text-centered" @submit="this.registerUser">
      <div class="column is-4 is-offset-4">
        <!-- Information -->

        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left has-ichellpoons-right">
              <input class="input" type="text" placeholder="Name" id="title" ref="title" v-model="user.title"
                     :class="{ 'form-group--error': $v.user.name.$error }">
              <span class="icon is-small is-left">
                <i class="fas fa-heading"></i>
    </span>
              <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
    </span>
            </div>
            <div class="help is-danger-passive" v-if="!$v.user.name.required">Field is required</div>
            <div class="help is-danger-passive" v-if="!$v.user.name.alpha">Name must have at least only letters.</div>
          </div>
        </div>
        <div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Description" id="description" ref="description"
                     v-model="user.description">
              <span class="icon is-small is-left">
              <i class="fas fa-book-open"></i>
    </span>
            </div>
            <p class="help is-info">A valid email is required</p>
          </div>
        </div>


        <!--Category  -->
        <b-dropdown hoverable aria-role="list">
          <button class="button is-black-passive" slot="trigger">
            <span>Category</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <div v-for="category in categories">
          <b-dropdown-item aria-role="listitem">{{category.name}}</b-dropdown-item>
          </div>
        </b-dropdown>


        <!--Closing Date  -->
        <b-field label="Select datetime">
          <b-datetimepicker
            placeholder="Type or select a date..."
            icon="calendar-today"
            editable>
          </b-datetimepicker>
        </b-field>


        <div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-success" type="submit" value="Register User">Submit</button>
            </div>
            <div class="control">
              <button class="button is-danger">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Vuelidate from 'vuelidate'

  const {required, minLength, email, alpha, sameAs} = require('vuelidate/lib/validators')
  Vue.use(Vuelidate)

  export default {
    name: "CreatePetition",
    mounted: function() {
      this.getCategories();
    },

    data() {
      return {
        user: {
          name: "",
          email: "",
          password: "",
          repeatPassword: "",
          city: "",
          country: "",
          categories: {}
        }
      }
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
      },
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
          minLength: minLength(4),
          email,
        },
        password: {
          required,
          minLength: minLength(5),
        },
        repeatPassword: {
          required,
          sameAsPassword: sameAs('password')

        }
      }
    },
    methods: {
      getCategories: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions/categories')
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },

      compileJSON: function () {
        return {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          city: this.user.city,
          country: this.user.country
        }
      },
      registerUser: function (e) {
        e.preventDefault();
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          const body = this.compileJSON();
          this.$http.post('http://localhost:4941/api/v1/users/register', body)
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }
      }
    }
  }
</script>
