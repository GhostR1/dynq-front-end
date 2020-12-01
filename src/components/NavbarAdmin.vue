<template>
  <div>
    <b-navbar style="height: 100px;" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>DynQ</b-navbar-brand>
      <b-navbar-brand>Admin page</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-on:click="move_to_employee" right>Employees</b-nav-item>
          <b-nav-item v-on:click="move_to_client" right>Clients</b-nav-item>
          <b-nav-item v-on:click="move_to_problem" right>Problems</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Language" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">UA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-on:click="logout" right>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
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