<template>
  <b-container
      style="width: 750px; margin-top: 200px;z-index: 1">
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="8">
        <b-card header-bg-variant="dark"
                header-text-variant="white">
          <template #header>
            <b-navbar-brand >{{ $t('edit-client-label') }}</b-navbar-brand>
            <b-button-close v-on:click="closeEditing" text-variant="white"/>
          </template>
          <b-form @submit="onSubmit">
            <b-form-group label-cols="4" label-cols-lg="4" :label="name_label">
              <b-form-input v-model="Name" required />
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="surname_label">
              <b-form-input v-model="Surname" required/>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="second_name_label">
              <b-form-input v-model="SecondName" required/>
            </b-form-group>
            <b-form-group  label-cols="4" label-cols-lg="4" :label="phone_label">
              <b-form-input v-model="Phone" required/>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="4" :label="email_label">
              <b-form-input v-model="Email" required/>
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
      name_label: this.$t('name'),
      surname_label: this.$t('surname'),
      second_name_label: this.$t('second-name'),
      email_label: this.$t('email'),
      phone_label: this.$t('phone'),

      Name: this.$props.client_data.Name,
      Surname: this.$props.client_data.Surname,
      SecondName: this.$props.client_data.SecondName,
      Phone: this.$props.client_data.Phone,
      Email: this.$props.client_data.Email
    }
  },
  props: {
    client_data: {
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
          .patch('http://localhost:3000/api/client/'
              + this.$props.client_data._id, {
            Name: this.Name,
            Surname: this.Surname,
            SecondName: this.SecondName,
            Phone: this.Phone,
            Email: this.Email
          })
          .then(response => {
            if(response.status === 200) {
              this.closeEditing()
              alert("Client has been updated!")
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
      return (this.Name.length > 0  && this.Surname.length > 0 &&
          this.SecondName.length > 0 && this.Email.length > 0 &&
          this.Phone.length > 0) ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.Name.length > 0 && this.Surname.length > 0 &&
          this.SecondName.length > 0 && this.Email.length > 0 &&
          this.Phone.length > 0);
    }
  }
}
</script>