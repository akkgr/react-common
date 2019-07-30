var storage = {
  prefix: process.env.REACT_APP_STORAGE_PREFIX || '',
  get: function get(key) {
    var value = localStorage.getItem(storage.prefix + key);
    return JSON.parse(value);
  },
  set: function set(key, value) {
    return localStorage.setItem(storage.prefix + key, JSON.stringify(value));
  },
  remove: function remove(key) {
    localStorage.removeItem(storage.prefix + key);
  }
};
export default storage;