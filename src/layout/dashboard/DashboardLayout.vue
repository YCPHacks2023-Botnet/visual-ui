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

      <template v-if="this.isLoggedIn === false">
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="wrapper wrapper-full-page section content">
          <div class="">
            <div class="container">
              <div class="row">
                <div class="col-md-8 col-md-offset-2 text-center">
                  <h2 class="title text-danger">Please Login</h2>
                  <h2 class="title">Oops! It seems like you're not logged in.</h2>
                  <h2 class="title">You should probably do that.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <dashboard-content @click.native="toggleSidebar" v-else>

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
import Cookies from "js-cookie";
import {getJwtTokenFromCookie} from "@/pages/store/adapter/cookieUtils";

export default {
  components: {
    TopNavbar,
    DashboardContent
  },
  data() {
    return {
      data: [],
      isLoggedIn: false
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    getAllWorkers() {
      const jwtToken = getJwtTokenFromCookie();
      if (jwtToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
        axios.get(`http://${IpConstants}:8080/Management/GetBots`)
          .then((res) => {
            this.data = [];
            this.data = res.data.bots;
            this.isLoggedIn = true;
          })
          .catch((error) => {
            // eslint-disable-next-line
            if (error.response.status === 401) {
              Cookies.remove('user');
            } else
              console.error(error);
          });
      } else {
        this.isLoggedIn = false;
      }
    },
    loggedIn() {
      const jwtToken = getJwtTokenFromCookie()
      if (jwtToken !== undefined && jwtToken !== false)
        this.isLoggedIn = true;
      return jwtToken !== undefined && jwtToken !== false
    },
  },
  mounted() {
    this.getAllWorkers();

    setInterval(() => {
      this.getAllWorkers();
    }, 1000);

    this.loggedIn()
  }
};
</script>
