<template>
  <div>
    <NavbarEmployee/>
    <b-card-group deck style="padding: 2rem">
      <QueueCard
          v-for="appointment in queue"
          :key="appointment._id"
          :queue_data="appointment"/>
    </b-card-group>
  </div>
</template>

<script>
import NavbarEmployee from "@/components/NavbarEmployee";
import QueueCard from "@/components/QueueCard";

import axios from "axios";
import JWT from "jsonwebtoken"

export default {
  name: "Employee",
  data() {
    return {
      idEmp: JWT.decode(localStorage.jwt)._id,
      queue: [],
      deadline: "1000"
    }
  },
  components: {
    QueueCard,
    NavbarEmployee
  },
  mounted() {
    axios
        .get("http://localhost:3000/api/appointment/queue/" + this.idEmp)
        .then(response => this.queue = response.data)
  }
}
</script>