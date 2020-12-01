<template>
  <b-container
      style="width: 750px; margin-top: 200px;z-index: 1">
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="8">
        <b-card header-bg-variant="dark"
                header-text-variant="white">
          <template #header>
            <b-navbar-brand >Edit the problem</b-navbar-brand>
            <b-button-close v-on:click="closeEditing" text-variant="white"/>
          </template>
          <b-form @submit="onSubmit">
            <b-form-group label-cols="4" label-cols-lg="4" label="Text">
              <b-form-input v-model="Text" required />
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" label="Duration">
              <b-form-input v-model="Duration" required/>
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
      Text: this.$props.problem_data.Text,
      Duration: this.$props.problem_data.Duration,
    }
  },
  props: {
    problem_data: {
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
          .patch('http://localhost:3000/api/problem/'
              + this.$props.problem_data._id, {
            Text: this.Text,
            Duration: this.Duration
          })
          .then(response => {
            if(response.status === 200) {
              this.closeEditing()
              alert("Problem has been updated!")
              this.$router.go(0)
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
      return (this.Text.length > 0  && this.Duration.length > 0) ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.Text.length > 0  && this.Duration.length > 0);
    }
  }
}
</script>