<template>
  <div>
    <EmployeeEdit
        v-if="isEditVisible"
        @closeEditing="closeEditing"
        style="position: fixed; top:50px;right: 0;left: 0"
        :employee_data="this.$props.employee_data"/>

    <b-card class="mb-2" style="max-width: 20rem; margin: 1rem">
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('number') }}:</b-card-text>
        <b-card-text>{{ employee_data.EmpNum }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('name') }}:</b-card-text>
        <b-card-text>{{ employee_data.Name }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('surname') }}:</b-card-text>
        <b-card-text>{{ employee_data.Surname }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('second-name') }}:</b-card-text>
        <b-card-text>{{ employee_data.SecondName }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('email') }}:</b-card-text>
        <b-card-text>{{ employee_data.Email }}</b-card-text>
      </b-card-group>

      <b-button v-on:click="edit_employee" variant="dark" style="margin: 0.2rem;">{{ $t('edit') }}</b-button>
      <b-button v-on:click="remove_employee" variant="dark" style="margin: 0.2rem;">{{ $t('remove') }}</b-button>
    </b-card>
  </div>
</template>

<script>

import EmployeeEdit from "@/modal-component/EmployeeEdit";

import axios from "axios";

export default {
  name: "EmployeeCard",
  components: {
    EmployeeEdit
  },
  data() {
    return {
      isEditVisible: false
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
    edit_employee() {
      this.isEditVisible = true
    },
    remove_employee() {
      axios
          .delete('http://localhost:3000/api/employee/' +
              this.$props.employee_data._id)
          .then(response => {
            if(response.status === 200) {
              this.$router.go(0)
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 500) {
                alert(this.$t('err-other'));
              }
            }
          })
    },
    closeEditing() {
      this.isEditVisible = false
    }
  }
}
</script>