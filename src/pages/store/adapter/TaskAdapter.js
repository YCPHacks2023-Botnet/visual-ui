export default class TaskAdapter {
  constructor(adapter = {}) {
    this.id = adapter.id || '';
    this.task = adapter.task || '';
    this.taskParameters = adapter.taskParameters || '{}';
  }
}
