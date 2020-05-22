<template>
  <div>
    <Nav/>
    <div>
      <div v-if="errorFlag" style="color: red;">
        {{ error }}
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by1">
          <img :src="baseURL + petition.petitionId + '/photo'" alt="Hero image">

        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-96x96">
              <img :src="'http://localhost:4941/api/v1/users/' + petition.authorId + '/photo'" alt="no Author Image">

            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{petition.title}}</p>
            <p class="subtitle is-6">{{petition.authorName}}, {{petition.authorCity}} {{petition.authorCountry}}</p>
            <p>Signatures: {{petition.signatureCount}} Users</p>
          </div>
        </div>
        <div class="content">
          <p class="text-left">{{petition.description}}</p>
          <a href="#">#{{petition.category}}</a>
          <br>
          <time datetime="2016-1-1">Created: {{convertDates(petition.createdDate)}}</time>
          <br/>
          <time datetime="2016-1-1">Closing: {{convertDates(petition.closingDate)}}</time>
          <br/>
        </div>
      </div>

      <!--SHARE-->
      <SocialShare/>

      <!-- Signatories -->
      <div>
        <h1 class="title">Signatories</h1>
      </div>
      <div v-for="signatory in signatories">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <!--<img src="../assets/ninjaDefault.png" alt="No Signatory Image">-->
                  <img :src="baseURL + signatory.signatoryId + '/photo'"
                       alt="No Signatory"
                       onerror="this.onerror=null;this.src=defaultImage;"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-5">{{signatory.name}}, </p>
                <p class="subtitle is-6">{{signatory.city}}, {{signatory.country}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import SocialShare from "./socialShare";
  import Nav from "./nav.vue"

  export default {
    name: "Petition",
    components: {SocialShare, Nav},
    data() {
      return {
        error: "",
        errorFlag: false,
        baseURL: "http://localhost:4941/api/v1/petitions/",
        petition: {},
        petitionId: "",
        createdDate: "",
        closingDate: "",
        signatories: {},
        defaultImage: require("../assets/ninjaDefault.png"),
        userPhoto: "'http://localhost:4941/api/v1/users/' + signatory.signatoryId + '/photo'",
      }
    },
    mounted: function () {
      this.petitionId = this.$route.params.id;
      this.getPetition(this.petitionId);
      this.getSignature(this.petitionId);
    },
    computed: {},
    methods: {
      getPetition: function (petitionId) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + petitionId)

          //:4941/api/v1/petitions/undefined:1 Failed to load resource: the server responded with a

          .then((response) => {
            this.petition = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
      getSignature: function (petitionId) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + petitionId + '/signatures')
          .then((response) => {
            this.signatories = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
      convertDates: function (date) {
        let cDate = new Date(date);
        return cDate;
      },
      displayPhoto: function () {
        if (this.userPhoto != undefined) {
          return this.userPhoto;
        } else {
          return this.defaultImage;
        }
      }

    }

  }

</script>

