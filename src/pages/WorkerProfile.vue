<template>
  <div class="card text-center">
    <div class="card-header" style="font-size: 28px; text-decoration: underline; color: white">
      {{worker.name}}
    </div>
    <div class="card-body" style="text-align: left; padding-left:10%; font-size: 24px; color: white;">
      <p class="card-title"><strong>CPU:</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{worker.botClientSpecs.cpu}}</p>
      <p class="card-title"><strong>RAM:</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{worker.botClientSpecs.ram}}MB</p>
      <p class="card-text" style="color: white;"><strong>Status:</strong> &nbsp;&nbsp;{{worker.currentProgress}}</p>
      <p class="card-text" style="color: white;">IP Address: &nbsp;&nbsp;{{ worker.connectionInfo.ip }}</p>
    </div>
    <div class="card-footer text" style="color:white;">
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
