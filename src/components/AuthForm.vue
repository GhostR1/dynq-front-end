<template>
  <div>
    <b-container style="width: 600px; margin-top: 200px;">
      <b-row class="justify-content-md-center mt-4">
        <b-col col md="8">
          <b-card :header="header"
                  header-bg-variant="dark"
                  header-text-variant="white">
            <b-form @submit="onSubmit">
              <b-form-group
                :label="username_label">
                <b-form-input v-model="username" required></b-form-input>
              </b-form-group>
              <b-form-group
                  :label="password_label">
                <b-form-input v-model="password" type="password" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-button style="width:100%; margin-top: 40px;" type="submit" :variant="acceptableVerificationStyle" :disabled="acceptableVerification">
                  {{ $t('sign-in') }}</b-button>
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
      header: this.$t('login'),
      username_label: this.$t('username'),
      password_label: this.$t('password'),

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
                alert(this.$t('err-wrong-credentials'));
              } else if(err.response.status === 404) {
                axios.post('http://localhost:3000/api/employee/sign-in', {
                  Email: this.username,
                  Password: this.password
                })
                    .then(response => {
                      localStorage.jwt = response.data.token
                      this.$router.push('./employee')
                    })
                    .catch(err => {
                      if (err.response) {
                        alert(this.$t('err-wrong-credentials'));
                      } else if (err.request) {
                        alert(this.$t('err-lost-connection'))
                      } else {
                        alert(this.$t('err-other'))
                      }
                    })
              }
            } else if (err.request) {
              alert(this.$t('err-lost-connection'))
            } else {
              alert(this.$t('err-other'))
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