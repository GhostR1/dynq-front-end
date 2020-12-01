<template>
  <div>
    <b-container style="width: 600px; margin-top: 200px;">
      <b-row class="justify-content-md-center mt-4">
        <b-col col md="8">
          <b-card header="Login"
                  header-bg-variant="dark"
                  header-text-variant="white">
            <b-form @submit="onSubmit">
              <b-form-group
                label="Username">
                <b-form-input v-model="username" required></b-form-input>
              </b-form-group>
              <b-form-group
                  label="Password">
                <b-form-input v-model="password" type="password" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-button style="width:100%; margin-top: 40px;" type="submit" :variant="acceptableVerificationStyle" :disabled="acceptableVerification">Sign In</b-button>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios
          .post('http://localhost:3000/api/admin/sign-in', {
            Login: this.username,
            Password: this.password
          })
          .then(response => {
            localStorage.jwt = response.data.token
            this.$router.push('./admin-employee')
          })
          .catch(err => {
            if (err.response) {
              if(err.response.status === 401) {
                alert("Login or password are wrong! Please, try again!");
              } else if(err.response.status === 404) {
                axios.post('http://localhost:3000/api/employee/sign-in', {
                  Email: this.username,
                  Password: this.password
                })
                    .then(response => {
                      localStorage.jwt = response.data
                      this.$router.push('./employee')
                    })
                    .catch(err => {
                      if (err.response) {
                        alert("Login or password are wrong! Please, try again!");
                      } else if (err.request) {
                        alert("No connection with the server!")
                      } else {
                        alert("Something went wrong...")
                      }
                    })
              }
            } else if (err.request) {
              alert("No connection with the server!")
            } else {
              alert("Something gone wrong...")
            }
          })
    }
  },
  computed: {
    acceptableVerificationStyle() {
      return this.username.length > 0 && this.password.length > 0 ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.username.length > 0 && this.password.length > 0);
    }
  },
}
</script>