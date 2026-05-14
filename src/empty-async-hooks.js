export class AsyncLocalStorage {
  constructor() {}
  getStore() {
    return null
  }
  run(_store, callback, ...args) {
    return callback(...args)
  }
  exit(callback, ...args) {
    return callback(...args)
  }
}