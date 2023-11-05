<template>
    <div class="row">
      <div style="padding: 0px 5px; width: 100%; margin-left: 0%; margin-right: 2%;">
        <h1 style="text-align: center; margin-bottom:2%">Tasks Completed</h1>
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
            <th scope="row" style="padding: 0px 10px;">{{ task.id }}</th>
            <td style="padding: 0px 10px;">{{task.task}}</td>
            <td style="padding: 10px 10px;">{{task.taskParameters}}</td>
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
