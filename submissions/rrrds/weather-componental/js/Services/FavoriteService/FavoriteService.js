const storageKey = 'kw-favorites';

class FavoriteService {
  constructor() {
    this.data = JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  removeCity(cityName) {
    this.data = this.data.filter(val => {
      return val !== cityName;
    });
    this.save();
  }

  addCity(cityName) {
    this.data.push(cityName);
    this.save();
  }

  toggleCity(cityName) {
    if (this.data.includes(cityName)) {
      this.removeCity(cityName);
    } else {
      this.addCity(cityName);
    }
  }

  isFavorite(cityName) {
    return this.data.includes(cityName);
  }

  save() {
    localStorage.setItem(storageKey, JSON.stringify(this.data));
    if (this.cb) {
      this.cb(this.getData());
    }
  }

  getData() {
    return this.data;
  }

  subscribeForUpdate(cb) {
    this.cb = cb;
  }
}

export const favoriteService = new FavoriteService();
