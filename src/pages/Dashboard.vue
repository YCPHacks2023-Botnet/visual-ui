<template>
  <div>
    <div class="row">
      <div class="col-lg">
        <tasks-to-complete/>
      </div>
      <div class="col-lg">
        <completed-tasks/>
      </div>
    </div>
  </div>
</template>
<script>
  import CompletedTasks from "@/pages/CompletedTasks.vue";
  import TasksToComplete from "@/pages/TasksToComplete.vue";

  export default {
    components: {
      TasksToComplete,
      CompletedTasks
    },
    data() {
      return {}
    }
  };
</script>
<style>
</style>
