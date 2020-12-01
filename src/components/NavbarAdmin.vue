<template>
  <div>
    <b-navbar style="height: 100px;" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>DynQ</b-navbar-brand>
      <b-navbar-brand>{{ $t('admin-page') }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-on:click="move_to_employee" right>{{ $t('employees') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_client" right>{{ $t('clients') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_problem" right>{{ $t('problems') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="language" right>
            <b-dropdown-item v-on:click="changeLangEN">{{ $t('english') }}</b-dropdown-item>
            <b-dropdown-item v-on:click="changeLangUA">{{ $t('ukrainian') }}</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-on:click="logout" right>{{ $t('logout') }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      language: this.$t('language'),
      username_label: this.$t('username'),
      password_label: this.$t('password'),
    }
  },
  methods: {
    changeLangEN() {
      localStorage.lang = "en"
      this.$router.go(0)
    },
    changeLangUA() {
      localStorage.lang = "ua"
      this.$router.go(0)
    },
    logout() {
      localStorage.jwt = ""
      this.$router.push('../')
    },
    move_to_employee() {
      this.$router.push('../admin-employee')
    },
    move_to_client() {
      this.$router.push('../admin-client')
    },
    move_to_problem() {
      this.$router.push('../admin-problem')
    }
  }
}
</script>