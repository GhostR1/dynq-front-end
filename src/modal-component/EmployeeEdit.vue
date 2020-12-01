<template>
  <b-container
      style="width: 750px; margin-top: 200px;z-index: 1">
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="8">
        <b-card header-bg-variant="dark"
                header-text-variant="white">
          <template #header>
            <b-navbar-brand >Edit the employee</b-navbar-brand>
            <b-button-close v-on:click="closeEditing" text-variant="white"/>
          </template>
          <b-form @submit="onSubmit">
            <b-form-group label-cols="4" label-cols-lg="4" label="Name">
              <b-form-input v-model="Name" required />
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" label="Surname">
              <b-form-input v-model="Surname" required/>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" label="Second name">
              <b-form-input v-model="SecondName" required/>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" label="Email">
              <b-form-input v-model="Email" required/>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="4" label="Number">
              <b-form-input v-model="EmpNum" required/>
            </b-form-group>
            <b-form-group>
              <b-button
                  style="width:100%; margin-top: 40px;"
                  type="submit"
                  :variant="acceptableVerificationStyle"
                  :disabled="acceptableVerification">
                Submit
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
      Name: this.$props.employee_data.Name,
      Surname: this.$props.employee_data.Surname,
      SecondName: this.$props.employee_data.SecondName,
      EmpNum: this.$props.employee_data.EmpNum,
      Email: this.$props.employee_data.Email
    }
  },
  props: {
    employee_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios
          .patch('http://localhost:3000/api/employee/'
              + this.$props.employee_data._id, {
            Name: this.Name,
            Surname: this.Surname,
            SecondName: this.SecondName,
            EmpNum: this.EmpNum,
            Email: this.Email
          })
          .then(response => {
            if(response.status === 200) {
              this.closeEditing()
              alert("Employee has been updated!")
              this.$router.go()
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 500) {
                this.closeEditing();
                alert("Error occurred while editing!");
              }
            }
          })
    },
    closeEditing() {
      this.$emit('closeEditing')
    }
  },
  computed: {
    acceptableVerificationStyle() {
      return (this.Name.length > 0  && this.Surname.length > 0 &&
          this.SecondName.length > 0 && this.Email.length > 0 &&
          this.EmpNum.length > 0) ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.Name.length > 0 && this.Surname.length > 0 &&
          this.SecondName.length > 0 && this.Email.length > 0 &&
          this.EmpNum.length > 0);
    }
  }
}
</script>
