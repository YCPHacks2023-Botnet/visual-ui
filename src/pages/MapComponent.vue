<template>
  <div>
    <div id="map" style="height: 500px; width: 800px"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  mounted() {
    const ipList = [
      { ip: '192.168.1.1', id: 'marker1', info: 'Marker 1 Info' },
      { ip: '8.8.8.8', id: 'marker2', info: 'Marker 2 Info' },
      { ip: '13.52.149.57', id: 'marker3', info: 'Marker 3 Info' }
    ];
    this.displayMap(ipList);
  },
  methods: {
    async getHardcodedGeoInfo(ip) {
      // Replace these values with your actual hardcoded coordinates
      const hardcodedData = {
        '192.168.1.1': { latitude: 37.7749, longitude: -122.4194, info: 'Marker 1 Info' },
        '8.8.8.8': { latitude: 37.4220, longitude: -122.0841, info: 'Marker 2 Info' },
        '13.52.149.57': { latitude: 51.509865, longitude: -0.118092, info: 'Marker 3 Info' }
      };

      return hardcodedData[ip] || null;
    },
    async displayMap(ipList) {
      const map = L.map('map').setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '❤️', // Replace with your desired emoji or inline SVG
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      for (const item of ipList) {
        const { ip, id, info } = item;
        const geoInfo = await this.getHardcodedGeoInfo(ip);
        if (geoInfo) {
          const { latitude, longitude } = geoInfo;
          const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

          // Bind a popup with custom content to the marker
          const popupContent = document.createElement('div');
          const routerLink = document.createElement('router-link');
          routerLink.innerHTML = `<a href="#/dashboard/${id}" @click="navigateToDetails('${id}')">${info}</a>`;
          popupContent.appendChild(routerLink);

          // Bind the custom HTML content to the marker
          marker.bindPopup(popupContent, { maxWidth: 300 }); // Set maxWidth if needed
        }
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
