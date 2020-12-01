<template>
  <b-container
      style="width: 750px; margin-top: 200px;z-index: 1">
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="8">
        <b-card header-bg-variant="dark"
                header-text-variant="white">
          <template #header>
              <b-navbar-brand >{{ $t('add-employee-label') }}</b-navbar-brand>
              <b-button-close v-on:click="closeAdding" text-variant="white"/>
          </template>
          <b-form @submit="onSubmit">
            <b-form-group label-cols="4" label-cols-lg="4" :label="name_label">
              <b-form-input v-model="Name" required ></b-form-input>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="surname_label">
              <b-form-input v-model="Surname" required></b-form-input>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="second_name_label">
              <b-form-input v-model="SecondName" required></b-form-input>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="email_label">
              <b-form-input v-model="Email" required></b-form-input>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="password_label">
              <b-form-input v-model="Password" required></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="4" :label="number_label">
              <b-form-input v-model="EmpNum" required ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button
                  style="width:100%; margin-top: 40px;" type="submit"
                  :variant="acceptableVerificationStyle"
                  :disabled="acceptableVerification">
                {{ $t('submit') }}
              </b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name_label: this.$t('name'),
      surname_label: this.$t('surname'),
      second_name_label: this.$t('second-name'),
      email_label: this.$t('email'),
      password_label: this.$t('password'),
      number_label: this.$t('number'),

      estId: "5fb05ca6836a4c27a48c82ee",
      Name: "",
      Surname: "",
      SecondName: "",
      EmpNum: "",
      Email: "",
      Password: ""
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios
          .post('http://localhost:3000/api/employee', {
            estId: this.estId,
            Name: this.Name,
            Surname: this.Surname,
            SecondName: this.SecondName,
            EmpNum: this.EmpNum,
            Email: this.Email,
            Password: this.Password
          })
          .then(response => {
            if(response.status === 200) {
              this.closeAdding()
              alert("Employee has been added!")
              this.$router.go(0)
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 500) {
                this.closeAdding();
                alert("Error occurred while adding!");
              }
            }
          })
    },
    closeAdding() {
      this.$emit('closeAdding')
    }
  },
  computed: {
    acceptableVerificationStyle() {
      return (this.Name.length > 0  && this.Surname.length > 0 &&
      this.SecondName.length > 0 && this.Email.length > 0 &&
      this.Password.length > 0 && this.EmpNum.length > 0) ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.Name.length > 0 && this.Surname.length > 0 &&
          this.SecondName.length > 0 && this.Email.length > 0 &&
          this.Password.length > 0 && this.EmpNum.length > 0);
    }
  }
}
</script>