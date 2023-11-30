export default class LocationAdapter {
  constructor(adapter = {}) {
    this.id = adapter.id || '';
    this.ip = adapter.ip || '';
    this.longitude = adapter.longitude || 0.0;
    this.latitude = adapter.latitude || 0.0;
    this.info = adapter.name || '';
  }
}
