<template>
  <div style="width:80%; margin: 4% 15%;">
    <div class="row">
      <template v-if="id === null">
        <div class="col-lg">
          <tasks-to-complete/>
        </div>
        <div class="col-lg">
          <completed-tasks/>
        </div>
      </template>
      <template v-else-if="worker.id">
        <worker-profile
          :worker="worker"
        style="margin-top:0;"/>
        <div class="col-lg">
          <worker-completed-tasks :worker="worker"/>
        </div>
        <div class="col-lg">
          <worker-console-output :worker="worker"/>
        </div>
      </template>
      <template v-else>
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh; padding-left: 500px">
          <div class="jumbotron text-center bg-dark text-white">
            <h1 class="display-4">OH NO!! This Worker Was Not Found!</h1>
            <p class="lead">Hopefully they will be soon!!</p>
            <hr class="my-4">
            <p>Maybe it will work for us &#128064;</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import CompletedTasks from "@/pages/CompletedTasks.vue";
  import TasksToComplete from "@/pages/TasksToComplete.vue";
  import WorkerCompletedTasks from "@/pages/WorkerCompletedTasks.vue";
  import WorkerProfile from "@/pages/WorkerProfile.vue";
  import WorkerConsoleOutput from "@/pages/WorkerConsoleOutput.vue";
  import axios from "axios";
  import WorkerAdapter from "@/pages/store/adapter/WorkerAdapter";

  export default {
    components: {
      WorkerConsoleOutput,
      WorkerProfile,
      WorkerCompletedTasks,
      TasksToComplete,
      CompletedTasks
    },
    data() {
      return {
        id: null,
        worker: new WorkerAdapter()
      }
    },
    methods: {
      getTasksToComplete() {
        axios.get(`http://45.55.105.65:8080/Management/GetBotInfo?bot_id=${this.id}`)
          .then((res) => {
            this.worker = new WorkerAdapter(res.data.bot);
            // state.commit(StoreMutations.SET_ALL_COMPLETED_TASKS, res.data);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      }
    },
    created() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id;
        this.getTasksToComplete()
      }
    },
    mounted() {
      if (this.id) {
        setInterval(() => {
          this.getTasksToComplete();
        }, 5000);
      }
    }
  };
</script>
<style>
</style>
