<template>
  <div>
    <div id="map" style="height: 500px; width: 800px"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationAdapter from "@/pages/store/adapter/LocationAdapter";

export default {
  mounted() {
    this.displayMap();
  },
  props: {
    locationList: {
      type: Array
    }
  },
  methods: {
    async displayMap() {
      const ipList = this.locationList
      if (ipList ? ipList.length > 0 : false) {
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
            const marker = L.marker([latitude, longitude], {icon: customIcon}).addTo(map);

            // Bind a popup with custom content to the marker
            const popupContent = document.createElement('div');
            const routerLink = document.createElement('router-link');
            routerLink.innerHTML = `<a href="#/dashboard/${geoInfo.id}" @click="navigateToDetails('${geoInfo.id}')">${geoInfo.info}</a>`;
            popupContent.appendChild(routerLink);

            // Bind the custom HTML content to the marker
            marker.bindPopup(popupContent, {maxWidth: 300}); // Set maxWidth if needed
          }
        }
      } else {
        const map = L.map('map').setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
      }
    },
    navigateToDetails(id) {
      console.log(id)
      this.$router.push({ name: 'dashboard', params: { id: id } });
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
