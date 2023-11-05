<template>
  <div>
    <div class="row">
      <table-list/>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import TableList from "@/pages/CompletedTasks.vue";

  export default {
    components: {
      TableList
    },
    data() {
      return {}
    }
  };
</script>
<style>
</style>
