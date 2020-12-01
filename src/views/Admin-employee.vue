<template>
  <div>

    <EmployeeAdd
        v-if="isAddVisible"
        @closeAdding="closeAdding"
        style="position: fixed; top:50px;right: 0;left: 0"/>

    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee._id"
        :employee_data="employee"/>
      <b-icon-plus v-on:click="add_employee" font-scale="7.5"
                   style="margin-top: 5rem;"/>
    </b-card-group>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarAdmin";
import EmployeeCard from "@/components/EmployeeCard";
import EmployeeAdd from "@/modal-component/EmployeeAdd";
import JWT from 'jsonwebtoken'

import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      employees: [],
      idEst: JWT.decode(localStorage.jwt).estId,
      isAddVisible: false
    }
  },
  components: {
    NavBar,
    EmployeeCard,
    EmployeeAdd
  },
  methods: {
    add_employee() {
      this.isAddVisible = true
    },
    closeAdding() {
      this.isAddVisible = false
    }
  },
  mounted() {
    axios
        .get("http://localhost:3000/api/employee/establishment/" + this.idEst)
        .then(response => this.employees = response.data)
  }
}
</script>