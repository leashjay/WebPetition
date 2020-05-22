<template>
  <div>
    <span/>
    <div>
      <div v-if="errorFlag" style="color: red;">
        <div>Oh no! something has gone wrong {{ error }}</div>
        <!--"https://www.flaticon.com/authors/chanut"-->
        <img src="./assets/sadOne.png" alt="sad one lost connection" class="is-128x128">
      </div>
    </div>
    <!--Search Field -->
    <div>
      <span/>
      <br/>
    <div style="margin-bottom: 5px">
      <b-field>
        <label>Search by title: </label>
        <b-input type="text" v-model="search" placeholder="search petitions"></b-input>
        <br/>
      </b-field>

      <!--Category  -->
      <div class="buttons"> Sort by category:
        <b-select v-model="categoryFilter" placeholder="Filter by category">
          <option value="">Filter by category</option>
            <option v-for="category in categories">{{category.name}}</option>
        </b-select>
      </div>
    </div>
      <span/>
      <br/>
    </div>

    <!-- Petitions -->
    <div v-for="petition in filteredPetitions">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-medium is-96x96">
                <img :src="'http://localhost:4941/api/v1/petitions/' + petition.petitionId + '/photo'" alt="Hero image">
              </figure>
            </div>
            <div class="media-content">
              <p>
                <router-link :to="{ name: 'petition', params: { id: petition.petitionId }}" class="title is-4">
                  {{petition.title}}
                </router-link>


              <p class="subtitle is-6">{{petition.category}}</p>
            </div>
          </div>

          <div class="content">
            Creator <a>{{petition.authorName}}</a>.
            <br>
            <time datetime="2016-1-1">Signed so far: {{petition.signatureCount}} Users</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: "Petitions",
    data() {
      return {
        error: "",
        errorFlag: false,
        petitions: [],
        search: '',
        categories: {},
        categoryFilter: ""
      }
    },
    mounted: function () {
      this.getPetitions();
      this.getCategories();
    },
    computed: {
      filteredPetitions: function () {
        return this.petitions.filter((petition) => {
          return petition.title.match(this.search) && petition.category.match(this.categoryFilter);
        })
      }
    },
    methods: {
      getPetitions: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions')
          .then((response) => {
            this.petitions = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
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
    }
  }
</script>
