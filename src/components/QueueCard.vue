<template>
  <div>
    <b-card style="max-width: 20rem; text-align: center" :header="getNumber">
      <b-card-group>
        <b-card-text>{{ this.Name }} {{ this.Surname }} {{ this.SecondName }}</b-card-text>
      </b-card-group>
      <b-card-group style="margin-top: 1rem;">
        <b-card-text style="margin-right: 5px;">{{ $t('text') }}:</b-card-text>
        <b-card-text>{{queue_data.Text}}</b-card-text>
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QueueCard",
  data() {
    return {
      Name: "",
      Surname: "",
      SecondName: ""
    }
  },
  props: {
    queue_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getNumber() {
      return this.$props.queue_data.Place
    }
  },
  mounted() {
    axios.get("http://localhost:3000/api/client/" + this.$props.queue_data.clientId)
    .then(response => {
      this.Name = response.data.Name
      this.SecondName = response.data.SecondName
      this.Surname = response.data.Surname
    })
  }
}
</script>