<template>
  <div>
    <section class="hero is-warning is-small">
      <div class="hero-head">

      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Petitions APP
          </p>
          <p class="subtitle">
            A Place You Never Wanted To Be #Covid19 *anoying nokia tune*
          </p>
        </div>
      </div>

      <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth">
          <div class="container">
            <ul>
              <li class="is-active">
                <router-link to="/petitions" class="is-active">Petitions</router-link>
              </li>
              <li>
                <router-link to="/create" class="is-active">Create Edit</router-link>
              </li>
              <li>
                <router-link to="/profile" class="is-active">Profile</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name:"HomeBanner",
    components: {},
    data(){
      return {}
    },
    methods: {
      toggleNav() {
            var nav = document.querySelector('.navbar-menu');
            if(nav.className == "navbar-menu") {
                nav.className = "navbar-menu is-active";
            } else {
                nav.className = "navbar-menu";
            }
      }
    },
    head: {
      script: [
        { src: '/petition-app/src/assets/hamburger.js', body: true }
      ]
    }
  }
</script>
