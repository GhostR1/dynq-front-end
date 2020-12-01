<template>
  <div>

    <ClientEdit
        v-if="isEditVisible"
        @closeEditing="closeEditing"
        style="position: fixed; top:50px;right: 0;left: 0"
        :client_data="this.$props.client_data"/>

    <b-card class="mb-2" style="max-width: 20rem; margin: 1rem">
      <b-card-group>
        <b-card-text style="margin-right: 5px;">Name:</b-card-text>
        <b-card-text>{{ client_data.Name }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">Surname:</b-card-text>
        <b-card-text>{{ client_data.Surname }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">Second name:</b-card-text>
        <b-card-text>{{ client_data.SecondName }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">Email:</b-card-text>
        <b-card-text>{{ client_data.Email }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">Phone:</b-card-text>
        <b-card-text>{{ client_data.Phone }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">Status:</b-card-text>
        <b-card-text>{{ client_data.Status }}</b-card-text>
      </b-card-group>

      <b-button v-on:click="edit_client" variant="dark" style="width:100%; margin: 0.2rem;">Edit</b-button>
    </b-card>
  </div>
</template>

<script>
import ClientEdit from "@/modal-component/ClientEdit";

export default {
  name: "ClientCard",
  components: {
    ClientEdit
  },
  data() {
    return {
      isEditVisible: false,
      Status: "asd"
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
    edit_client() {
      this.isEditVisible = true
    },
    closeEditing() {
      this.isEditVisible = false
    }
  },
  computed: {
    getStatus() {
      return this.$props.client_data.Status === "-" ? "IN" : "OUT"
    }
  }
}
</script>