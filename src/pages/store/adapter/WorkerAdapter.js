export default class WorkerAdapter {
  constructor(adapter = {}) {
    this.botClientSpecs = adapter.botClientSpecs || '';
    this.botResult = adapter.botResult || '';
    this.completedTasks = adapter.completedTasks || '';
    this.connectionInfo = adapter.connectionInfo || '';
    this.currentProgress = adapter.currentProgress || '';
    this.id = adapter.id || '';
    this.name = adapter.name || '';
    this.output = adapter.output || '';
    this.taskId = adapter.taskId || '';
  }
}
