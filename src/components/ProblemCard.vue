<template>
  <div>
    <ProblemEdit
        v-if="isEditVisible"
        @closeEditing="closeEditing"
        style="position: fixed; top:50px;right: 0;left: 0"
        :problem_data="this.$props.problem_data"/>

    <b-card class="mb-2" style="max-width: 20rem; margin: 1rem">
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('text') }}:</b-card-text>
        <b-card-text>{{ problem_data.Text }}</b-card-text>
      </b-card-group>
      <b-card-group>
        <b-card-text style="margin-right: 5px;">{{ $t('duration') }}:</b-card-text>
        <b-card-text>{{ problem_data.Duration }}</b-card-text>
      </b-card-group>
      <b-button v-on:click="edit_problem" variant="dark" style="margin: 0.2rem;">{{ $t('edit') }}</b-button>
      <b-button v-on:click="remove_problem" variant="dark" style="margin: 0.2rem;">{{ $t('remove') }}</b-button>
    </b-card>
  </div>
</template>

<script>

import ProblemEdit from "@/modal-component/ProblemEdit";

import axios from "axios";

export default {
  name: "ProblemCard",
  components: {
    ProblemEdit
  },
  data() {
    return {
      isEditVisible: false
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
    edit_problem() {
      this.isEditVisible = true
    },
    remove_problem() {
      axios
          .delete('http://localhost:3000/api/problem/' +
              this.$props.problem_data._id)
          .then(response => {
            if(response.status === 200) {
              alert("Problem has been removed!")
              this.$router.go(0)
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 500) {
                alert("Error occurred while deleting!");
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