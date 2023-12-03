<template>
  <div>
    <template v-if="isWorker">
      <div style="margin-left: 0%; margin-top: 5%; width: auto;">
        <h1 style="margin-left: 40%;">Bot Locations</h1>
        <div id="map" style="margin-top:2%;height: 500px; width: 1000px"></div>
        <button @click="reloadMap">Reload Map</button>
      </div>
    </template>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  mounted() {
    this.displayMap();
    setInterval(() => {
      this.displayMap();
    }, 500);
  },
  props: {
    locationList: {
      type: Array
    },
    isWorker: {
      type: Boolean
    }
  },
  data() {
    return {
      isInit: false
    }
  },
  methods: {
    async displayMap() {
      const ipList = this.locationList
      if ((ipList ? ipList.length > 0 : false) && !this.isInit) {
        const map = L.map('map').setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: '❤️',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        for (const geoInfo of ipList) {
          if (geoInfo) {
            const {latitude, longitude} = geoInfo;
            // Convert latitude and longitude to numbers
            const numericLatitude = Number(latitude);
            const numericLongitude = Number(longitude);

            const marker = L.marker([numericLatitude, numericLongitude], {icon: customIcon}).addTo(map);

            // Bind a popup with custom content to the marker
            const popupContent = document.createElement('div');
            const routerLink = document.createElement('router-link');
            routerLink.innerHTML = `<a href="#/dashboard/${geoInfo.id}" @click="navigateToDetails('${geoInfo.id}')">${geoInfo.name}</a>`;
            popupContent.appendChild(routerLink);

            // Bind the custom HTML content to the marker
            marker.bindPopup(popupContent, {maxWidth: 250}); // Set maxWidth if needed
          }
        }
        this.isInit = true
      }
    },
    navigateToDetails(id) {
      console.log(id)
      this.$router.push({ name: 'dashboard', params: { id: id } });
    },
    reloadMap() {
      // Remove existing map if it exists
      const existingMap = L.DomUtil.get('map');
      if (existingMap) {
        existingMap._leaflet_id = null;
      }
      this.isInit = false;
    }
  }
};
</script>

<style>
/* Add any custom styles for your map container */
#map {
  width: 100%;
}
.custom-marker {
  font-size: 24px;
  color: red; /* Change the color if needed */
}
</style>
