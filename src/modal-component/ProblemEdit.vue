<template>
  <b-container
      style="width: 750px; margin-top: 200px;z-index: 1">
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="8">
        <b-card header-bg-variant="dark"
                header-text-variant="white">
          <template #header>
            <b-navbar-brand >{{ $t('edit-problem-label') }}</b-navbar-brand>
            <b-button-close v-on:click="closeEditing" text-variant="white"/>
          </template>
          <b-form @submit="onSubmit">
            <b-form-group label-cols="4" label-cols-lg="4" :label="text_label">
              <b-form-input v-model="Text" required />
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="duration_label">
              <b-form-input type="number" min="0" step="5" v-model="Duration" required/>
            </b-form-group>
            <b-form-group>
              <b-button
                  style="width:100%; margin-top: 40px;"
                  type="submit"
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
      text_label: this.$t('text'),
      duration_label: this.$t('duration'),

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
              this.$router.go(0)
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 500) {
                this.closeEditing();
                alert(this.$t('err-other'));
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