<template>
  <div class="hero-body">
    <form class="container has-text-centered" @submit="this.createPetition">
      <div class="column is-4 is-offset-4">
        <!-- Information -->

        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Petition title" id="title" ref="title" v-model="user.title"
                     :class="{ 'form-group--error': $v.user.name.$error }">
              <span class="icon is-small is-left">
                <i class="fas fa-heading"></i>

    </span>
            </div>
            <div class="help is-danger-passive" v-if="!$v.user.name.required">Field is required</div>
            <div class="help is-danger-passive" v-if="!$v.user.name.alpha">Name must have at least only letters.</div>
          </div>
        </div>
        <div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Description" id="description" ref="description"
                     v-model="user.description">
              <span class="icon is-small is-left">
              <i class="fas fa-book-open"></i>
    </span>
            </div>
            <p class="help is-info">A valid email is required</p>
          </div>
        </div>


        <!--Category  -->

        <div class="buttons">
          <b-select v-model="selectedCategory" placeholder="Select a category">
            <option value="">Select category</option>
            <option v-for="category in categories">{{category.name}}</option>
          </b-select>
        </div>


        <!--Closing Date  -->
        <b-field label="Select datetime" v-model="closingDateTime">
          <b-datetimepicker
            placeholder="Type or select a date..."
            icon="calendar-today"
            editable>
          </b-datetimepicker>
        </b-field>


        <div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-success"
                type="submit"
                value="Create petition">Submit
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
</template>

<script>
  import Vue from 'vue'
  import Vuelidate from 'vuelidate'

  const {required, minLength, email, alpha, sameAs} = require('vuelidate/lib/validators')
  Vue.use(Vuelidate)

  export default {
    name: "createOrEdit",
    data() {
      return {
        user: {
          name: "",
          email: "",
          password: "",
          repeatPassword: "",
          city: "",
          country: "",
        },
        categories: {},
        selectedCategory: "",
        closingDateTime: ""
      }
    },
    mounted: function () {
      this.getCategories();
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
      selectedCategory: function () {
        return this.selectedCategory
      },
      closingDateTime: function () {
        return this.closingDateTime
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
          title: this.title,
          description: this.description,
          category: this.selectedCategory,
          closingDateTime: this.closingDateTime
        }
      },

      createPetition: function (e) {
        e.preventDefault();
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          console.log('error!')
          this.submitStatus = 'ERROR'
        } else {
          console.log('compile!')
          const body = this.compileJSON();
          this.$http.post('http://localhost:4941/api/v1/petitions', body)
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }

      },
      resetForm() {
        Object.keys(this.user).forEach(key => {
          this.user[key] = ''
        });
        this.$router.push("./")
      }

    }
  }
</script>
