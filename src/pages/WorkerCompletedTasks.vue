<template>
    <div class="row">
      <div style="padding-left: 50px; width: 500px">
        <h1>Tasks Completed</h1>
        <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Task</th>
            <th scope="col">TaskParams</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(task) in worker.completedTasks">
            <th scope="row">{{ task.id }}</th>
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
import WorkerAdapter from "@/pages/store/adapter/WorkerAdapter";

export default {
  components: {
    BaseTable
  },
  props: {
    worker: {
      default: null,
      required: true
    }
  },
};
</script>
<style>
</style>
