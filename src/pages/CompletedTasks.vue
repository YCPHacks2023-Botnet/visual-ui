<template>
  <div>
    <h3 style="text-align: center;margin-left: 0">All Tasks Completed</h3>
    <div class="row all">
      <div style="width: 100%; margin-left: 5%">
        <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Task</th>
            <th scope="col">TaskParams</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(task) in data">
            <th scope="row">{{task.id}}</th>
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

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    getAllCompletedTasks() {
      axios.get(`http://${IpConstants}:8080/Management/getcompletedtasks`)
        .then((res) => {
          this.data = [];
          this.data = res.data;
          // state.commit(StoreMutations.SET_ALL_COMPLETED_TASKS, res.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    }
  },
  mounted() {
    this.getAllCompletedTasks();

    // Set up interval to fetch data every second
    setInterval(() => {
      this.getAllCompletedTasks();
    }, 1000);
  }
};
</script>
<style>
.all {
  height: 88vh;
  overflow-y: auto;
}
</style>
