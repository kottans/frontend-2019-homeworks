const resourceCache = {}
const readyCallbacks = []
export default class Resources {
  static isReady() {
    let ready = true
    for (let k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false
      }
    }
    return ready
  }

  static load(urlOrArr) {
    if (Array.isArray(urlOrArr)) {
      urlOrArr.forEach(url => this._load(url))
    } else {
      this._load(urlOrArr)
    }
  }

  static _load(url) {
    if (resourceCache[url]) {
      return resourceCache[url]
    } else {
      let img = new Image()
      img.onload = () => {
        resourceCache[url] = img
        if (this.isReady()) {
          readyCallbacks.forEach(func => func())
        }
      }

      resourceCache[url] = false
      img.src = url
    }
  }

  static get(url) {
    return resourceCache[url]
  }

  static onReady(func) {
    readyCallbacks.push(func)
  }
}
