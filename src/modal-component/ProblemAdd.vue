<template>
  <b-container
      style="width: 750px; margin-top: 200px;z-index: 1">
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="8">
        <b-card header-bg-variant="dark"
                header-text-variant="white">
          <template #header>
            <b-navbar-brand >{{ $t('add-problem-label') }}</b-navbar-brand>
            <b-button-close v-on:click="closeAdding" text-variant="white"/>
          </template>
          <b-form @submit="onSubmit">
            <b-form-group label-cols="4" label-cols-lg="4" :label="text_label">
              <b-form-input v-model="Text" required ></b-form-input>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="duration_label">
              <b-form-input type="number" v-model="Duration" required></b-form-input>
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

      estId: "5fb05ca6836a4c27a48c82ee",
      Text: "",
      Duration: "",
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios
          .post('http://localhost:3000/api/problem', {
            estId: this.estId,
            Text: this.Text,
            Duration: this.Duration,
          })
          .then(response => {
            if(response.status === 200) {
              this.closeAdding()
              this.$router.go(0)
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 500) {
                this.closeAdding();
                alert(this.$t('err-other'));
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
      return (this.Text.length > 0  && this.Duration.length > 0) ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.Text.length > 0  && this.Duration.length > 0);
    }
  }
}
</script>