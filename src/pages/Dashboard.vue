<template>
  <div style="width:80%; margin: 4% 15%;">
    <div class="row">
      <map-component
        :location-list="locationData"
      />
      <template v-if="id === null">
        <div class="" style="display: flex; margin-top: 5%; width: 110%;">
          <div  style="margin-right: 5%; width: 45%;">
            <tasks-to-complete/>
          </div>
          <div style="margin-left: 0%; width: 45%;">
            <completed-tasks/>
          </div>
        </div>
      </template>
      <template v-else-if="worker.id">
        <worker-profile
          :worker="worker"
        style="margin-top: 2%"/>
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
  import MapComponent from "@/pages/MapComponent.vue";
  import IpConstants from "@/pages/store/IpConstants";
  import Cookies from "js-cookie";
  import LocationAdapter from "@/pages/store/adapter/LocationAdapter";
  import {getJwtTokenFromCookie} from "@/pages/store/adapter/cookieUtils";

  export default {
    components: {
      MapComponent,
      WorkerConsoleOutput,
      WorkerProfile,
      WorkerCompletedTasks,
      TasksToComplete,
      CompletedTasks
    },
    data() {
      return {
        id: null,
        worker: new WorkerAdapter(),
        locationData: []
      }
    },
    methods: {
      getTasksToComplete() {
        const jwtToken = getJwtTokenFromCookie();
        if (jwtToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
          axios.get(`http://${IpConstants}:8080/Management/GetBotInfo?bot_id=${this.id}`)
            .then((res) => {
              this.worker = new WorkerAdapter(res.data.bot);
            })
            .catch((error) => {
              // eslint-disable-next-line
              if (error.response.status === 401) {
                Cookies.remove('user');
              } else
                console.error(error);
            });
        }
      },
      getAllWorkers() {
        const jwtToken = getJwtTokenFromCookie();
        if (jwtToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
          axios.get(`http://${IpConstants}:8080/Management/GetBots`)
            .then((res) => {
              this.locationData = [];

              this.locationData = res.data.bots
            })
            .catch((error) => {
              // eslint-disable-next-line
              if (error.response.status === 401) {
                Cookies.remove('user');
                this.locationData = [];
              } else
                console.error(error);
            });
        }
      },
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
      } else {
        setInterval(() => {
          this.getAllWorkers();
        }, 5000);
      }
    }
  };
</script>
<style>
</style>
