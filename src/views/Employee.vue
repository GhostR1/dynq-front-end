<template>
  <div>
    <NavbarEmployee style="margin-bottom: 3rem"/>
    <b-card-group
        v-if="isQueue"
        deck style="padding: 2rem">
      <b-button-group vertical style="margin-inline: 2rem ">
        <b-button
            style="margin: 0.3rem"
            variant="success"
            v-on:click="start"
            :disabled="checkStart">
          {{ $t('start') }}
        </b-button>
        <b-button
            style="margin: 0.3rem"
            variant="info"
            v-on:click="done"
            :disabled="checkDone">
          {{ $t('done') }}
        </b-button>
        <b-button
            style="margin: 0.3rem"
            variant="danger"
            v-on:click="cancel"
            :disabled="checkCancel">
          {{ $t('cancel') }}
        </b-button>
      </b-button-group>
      <QueueCard
          v-for="appointment in queue"
          :key="appointment._id"
          :queue_data="appointment"/>
    </b-card-group>
    <span style="margin-top: 200px; font-size: 14pt" v-else>{{ $t('empty-queue')}}</span>
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
      isStart: true,
      isDone: false,
      isCancel: true
    }
  },
  components: {
    QueueCard,
    NavbarEmployee
  },
  methods: {
    start() {
      axios
          .patch("http://localhost:3000/api/client/status/"
          + this.queue[0].clientId, { Status: "Started" })
          .then(response => {
            if(response.status === 200) {
              this.isStart = false
              this.isDone = true
              this.isCancel = false
            }
          })
    },
    done() {
      this.cancel()
    },
    cancel() {
      axios
          .patch("http://localhost:3000/api/client/status/"
              + this.queue[0].clientId, { Status: "-" })
          .then(response => {
            if(response.status === 200) {
              axios
                  .delete("http://localhost:3000/api/appointment/"
                      + this.queue[0]._id, {
                    headers: {},
                    data: {
                      empId: this.idEmp
                    }})
                  .then(response => {
                    if(response.status === 200) {
                      this.isStart = true
                      this.isDone = false
                      this.isCancel = true
                      this.$router.go(0)
                    }
                  })
            }
          })
    }
  },
  computed: {
    checkStart() {
      let flag = this.queue.length > 0;
      if(flag) {
        if(this.queue[0].Status === "Started") {
          return true;
        }
      }
      return !(this.isStart && (flag))
    },
    checkDone() {
      let flag = this.queue.length > 0;
      if(flag) {
        if(this.queue[0].Status === "Started") {
          return false;
        }
      }
      return !(this.isDone && (flag))
    },
    checkCancel() {
      let flag = this.queue.length > 0;
      if(flag) {
        if(this.queue[0].Status === "Started") {
          return true;
        }
      }
      return !(this.isCancel && (flag))
    },
    isQueue() {
      return this.queue.length > 0
    }
  },
  mounted() {
    axios
        .get("http://localhost:3000/api/appointment/queue/" + this.idEmp)
        .then(response => this.queue = response.data)
  }
}
</script>