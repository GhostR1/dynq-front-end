<template>
  <div>

    <ClientAdd
        v-if="isAddVisible"
        @closeAdding="closeAdding"
        style="position: fixed; top:50px;right: 0;left: 0"/>

    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <ClientCard
          v-for="client in clients"
          :key="client._id"
          :client_data="client"/>
      <b-icon-plus v-on:click="add_client" font-scale="7.5"
                   style="margin-top: 5rem;"/>
    </b-card-group>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarAdmin";
import ClientCard from "@/components/ClientCard";
import ClientAdd from "@/modal-component/ClientAdd";

import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      clients: [],
      isAddVisible: false
    }
  },
  components: {
    NavBar,
    ClientCard,
    ClientAdd
  },
  methods: {
    add_client() {
      this.isAddVisible = true
    },
    closeAdding() {
      this.isAddVisible = false
    }
  },
  mounted() {
    axios
        .get("http://localhost:3000/api/client/")
        .then(response => this.clients = response.data)
  }
}
</script>