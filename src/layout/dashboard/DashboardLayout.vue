<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          v-for="(link, index) in data"
          :key="index"
          :to="`/dashboard/${link.id}`"
          :name="link.name"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import axios from "axios";
import IpConstants from "@/pages/store/IpConstants";
export default {
  components: {
    TopNavbar,
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
      axios.get(`http://${IpConstants}:8080/Management/GetBots`)
        .then((res) => {
          this.data = [];
          this.data = res.data.bots;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  mounted() {
    this.getAllWorkers();

    setInterval(() => {
      this.getAllWorkers();
    }, 1000);
  }
};
</script>
