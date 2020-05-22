<template>
  <div>
    <div>
      <Nav/>
    </div>
    <HomeBanner/>
    <section class="section is-medium">
      <!-- <petitions/> -->
      <HomepageSections />
    </section>
  </div>
</template>

<script>
  import Petitions from "./Petitions";
  import HomepageSections from "./components/HomepageSections";
  import HomeBanner from "./components/homeBanner";
  import Nav from "./components/nav.vue"

  export default {
    name:"Home",
    components: {HomeBanner, Petitions, HomepageSections, Nav},
    bannerState: "home",
    data(){
      return {}
    },
    methods: {
      changeBanner: function (newState){
        this.state = "<" + newState + "/>";
      }

    }

  }
</script>
