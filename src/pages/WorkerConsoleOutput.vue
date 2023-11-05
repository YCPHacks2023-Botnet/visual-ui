<template>
  <div class="console" v-html="worker.output">
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
};
</script>

<style>
.console {
  font-family: monospace;
  text-align: left;
  background-color: black;
  color: #fff;
  overflow-y: auto;
}
</style>
