<template>
  <div>
  <h3 style="text-align: center;">All Tasks Remaining</h3>
    <div class="row all">
      <div style="margin-left: 10%; width: 90%">
        <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Task</th>
            <th scope="col">TaskParams</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(task, index) in data">
            <th scope="row">{{ task.id }}</th>
            <td>{{task.task}}</td>
            <td>{{task.taskParameters}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
import IpConstants from "@/pages/store/IpConstants";
import Cookies from "js-cookie";
import {getJwtTokenFromCookie} from "@/pages/store/adapter/cookieUtils";

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      data: []
    };
  },
  computed: {
  },
  methods: {
    getTasksToComplete() {
      const jwtToken = getJwtTokenFromCookie();
      if (jwtToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
        axios.get(`http://${IpConstants}:8080/Management/GetWaitingTasks`)
          .then((res) => {
            this.data = [];
            this.data = res.data;
          })
          .catch((error) => {
            // eslint-disable-next-line
            if (error.response.status === 401) {
              Cookies.remove('user');
              this.data = [];
            } else
              console.error(error);
          });
      }
    }
  },
  mounted() {
    this.getTasksToComplete();

    // Set up interval to fetch data every second
    setInterval(() => {
      this.getTasksToComplete();
    }, 10000);
  }
};
</script>
<style>
.all {
  height: 88vh;
  overflow-y: auto;
}
</style>
