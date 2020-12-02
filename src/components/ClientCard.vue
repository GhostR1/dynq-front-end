<template>
  <div>

    <ClientEdit
        v-if="isEditVisible"
        @closeEditing="closeEditing"
        style="position: fixed; top:50px;right: 0;left: 0"
        :client_data="this.$props.client_data"/>

    <b-card class="mb-2" style="max-width: 20rem; margin: 1rem">
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('name') }}:</b-card-text>
        <b-card-text>{{ client_data.Name }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('surname') }}:</b-card-text>
        <b-card-text>{{ client_data.Surname }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('second-name') }}:</b-card-text>
        <b-card-text>{{ client_data.SecondName }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('email') }}:</b-card-text>
        <b-card-text>{{ client_data.Email }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('phone') }}:</b-card-text>
        <b-card-text>{{ client_data.Phone }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('status') }}:</b-card-text>
        <b-card-text :class="checkStatus">{{ client_data.Status }}</b-card-text>
      </b-card-group>

      <b-button v-on:click="edit_client" variant="dark" style="width:100%; margin: 0.2rem;">{{ $t('edit') }}</b-button>
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
      Status: {
        out : "danger",
        started : "success",
        waiting : "info"
      }
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
    checkStatus() {
      if(this.$props.client_data.Status === "Started") {
        return "text-success";
      } else if(this.$props.client_data.Status === "Waiting") {
        return "text-info";
      } else {
        return "text-danger"
      }
    }
  }
}
</script>