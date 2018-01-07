import MemoryStore from './memory-storage';

class Store {
  constructor() {
    this.memoryStore = new MemoryStore();
  }
  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      return JSON.parse(this.memoryStore.getItem(key));
    }
  }

  setItem(key, valueObj, rememberMe = true) {
    try {
      if (rememberMe) {
        localStorage.setItem(key, JSON.stringify(valueObj));
      } else {
        sessionStorage.setItem(key, JSON.stringify(valueObj));
      }
    } catch (err) {
      this.memoryStore.setItem(key, JSON.stringify(valueObj));
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (err) {
      this.memoryStore.removeItem(key);
    }
  }
}

let storeInstance;
export default () => {
  if (storeInstance) {
    return storeInstance;
  }
  storeInstance = new Store();
  return storeInstance;
};
