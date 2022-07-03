<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div id="navbar" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- Check that the SDK client is not currently loading before accessing is methods -->
            <div v-if="!this.$auth.loading">
              <!-- show login when not authenticated -->
              <a v-if="!this.$auth.isAuthenticated" @click="loginAuth0" class="button is-dark"><strong>Sign in</strong></a>
              <!-- show logout when authenticated -->
              <a v-if="this.$auth.isAuthenticated" @click="logoutAuth0" class="button is-dark"><strong>Log out</strong></a>
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
    loginAuth0 () {
      this.$auth.loginWithRedirect()
    },
    logoutAuth0 () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: $menuActiveText;
      }
    }
  }
</style>
