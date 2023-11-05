<template>
  <div class="card text-center">
    <div class="card-header" style="font-size: 28px; text-decoration: underline; color: white">
      {{worker.name}}
    </div>
    <div class="card-body" style="text-align: left; padding-left:10%; font-size: 24px; color: white;">
      <p class="card-title">CPU: {{worker.botClientSpecs.cpu}}</p>
      <p class="card-title">RAM: {{worker.botClientSpecs.ram}}MB</p>
      <p class="card-text" style="color: white;">Current Progress: {{worker.currentProgress}}</p>
      <a class="btn btn-info" style="width: 25%; font-size:24px;padding-left: 2%; pointer-events:none;">IP Address: &nbsp;&nbsp;{{ worker.connectionInfo.ip }}</a>
    </div>
    <div class="card-footer text-muted">
      Last Heard From <strong>{{((utcTime) => ((hours) => `${(hours < 12 ? hours : hours - 12).toString().padStart(2, '0')}:${utcTime.slice(3, 5)}:${utcTime.slice(6, 8)} ${hours < 12 ? 'AM' : 'PM'}`)((parseInt(utcTime.slice(0, 2)) - 5 + 24) % 24))((worker.connectionInfo.lastHeardFrom).split("T")[1].slice(0, 8))}}</strong>
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
