<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img src="../assets/logo.png" alt="aVoice Logo">
      <a class="navbar-item" href="/">

        <strong>Petition Site</strong>
      </a>
      <a @click="toggleNav()" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar" class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/" class="navbar-item is-active">Home</router-link>
        <router-link to="/register" class="navbar-item">Register</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- Check that the SDK client is not currently loading before accessing is methods -->
            <div v-if="!$auth.loading">
              <!-- show login when not authenticated -->
              <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark"><strong>Sign in</strong></a>
              <!-- show logout when authenticated -->
              <a v-if="$auth.isAuthenticated" @click="logout" class="button is-dark"><strong>Log out</strong></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>

  export default {
    name: 'Nav',
    methods: {
      toggleNav() {
        var nav = document.querySelector('.navbar-menu');
        if (nav.className == "navbar-menu") {
          nav.className = "navbar-menu is-active";
        } else {
          nav.className = "navbar-menu";
        }
      },
      // Log the user in
      login() {
        this.$auth.loginWithRedirect();
      },
      // Log the user out
      logout() {
        this.$auth.logout({
          returnTo: window.location.origin
        });
      }
    },
    head: {
      script: [
        {src: '/petition-app/src/assets/hamburger.js', body: true}
      ]
    }
  }
</script>

<style lscoped>

</style>
