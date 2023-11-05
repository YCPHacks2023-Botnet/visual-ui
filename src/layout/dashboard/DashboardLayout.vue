<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">






        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')"/>
        <sidebar-link to="/dashboard" :name="$t('place holder')"/>
        <sidebar-link to="/dashboard" :name="$t('place holder')"/>
        <sidebar-link to="/dashboard" :name="$t('place holder')"/>
        <sidebar-link to="/dashboard" :name="$t('place holder')"/>
        <sidebar-link to="/yucky" :name="$t('place holder')"/>
        <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')"/>





        
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
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
