<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          v-for="(link, index) in data"
          :key="index"
          :to="`/dashboard${link.id}`"
          :name="link.name"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import axios from "axios";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    getAllWorkers() {
      axios.get('http://45.55.70.104:8080/Management/GetBots')
        .then((res) => {
          this.data = [];
          this.data = res.data.bots;
          // state.commit(StoreMutations.SET_ALL_COMPLETED_TASKS, res.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  mounted() {
    this.getAllWorkers();
  }
};
</script>
