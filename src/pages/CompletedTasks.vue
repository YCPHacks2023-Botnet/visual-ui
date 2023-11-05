<template>
    <div class="row">
      <div style="padding-left: 50px; width: 500px">
        <h1 style="text-align: center;">Completed Tasks</h1>
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
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";

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
      axios.get('http://45.55.70.104:8080/Management/getcompletedtasks')
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
</style>
