<template>
  <div class="card text-center">
    <div class="card-header">
      {{worker.name}}
    </div>
    <div class="card-body">
      <h5 class="card-title">CPU: {{worker.botClientSpecs.cpu}}</h5>
      <h5 class="card-title">RAM: {{worker.botClientSpecs.ram}}MB</h5>
      <p class="card-text">Current Progress: {{worker.currentProgress}}</p>
      <a disabled class="btn btn-primary">{{ worker.connectionInfo.ip }}</a>
    </div>
    <div class="card-footer text-muted">
      Last Heard From <strong>{{worker.connectionInfo.lastHeardFrom}}</strong>
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
  }
}
</script>

<style scoped>

</style>
