<template>
  <div>
    <ProblemAdd
        v-if="isAddVisible"
        @closeAdding="closeAdding"
        style="position: fixed; top:50px;right: 0;left: 0"/>

    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <ProblemCard
          v-for="problem in problems"
          :key="problem._id"
          :problem_data="problem"/>
      <b-icon-plus v-on:click="add_problem" font-scale="7.5"
                   style="margin-top: 2rem;"/>
    </b-card-group>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarAdmin";
import ProblemAdd from "@/modal-component/ProblemAdd";
import ProblemCard from "@/components/ProblemCard";

import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      problems: [],
      idEst: "5fb05ca6836a4c27a48c82ee",
      isAddVisible: false
    }
  },
  components: {
    NavBar,
    ProblemCard,
    ProblemAdd
  },
  methods: {
    add_problem() {
      this.isAddVisible = true
    },
    closeAdding() {
      this.isAddVisible = false
    }
  },
  mounted() {
    axios
        .get("http://localhost:3000/api/problem/list/" + this.idEst)
        .then(response => this.problems = response.data)
  }
}
</script>