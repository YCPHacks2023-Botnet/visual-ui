<template>
    <div class="row">
      <div style="padding-left: 50px; width: 500px">
        <h1>Completed Tasks</h1>
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
            <th scope="row">{{++index}}</th>
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
  computed: {
  },
  methods: {
    getAllCompletedTasks(state) {
      axios.get('http://45.55.70.104:8080/Management/getcompletedtasks')
        .then((res) => {
          console.log(res);
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
  }
};
</script>
<style>
</style>
