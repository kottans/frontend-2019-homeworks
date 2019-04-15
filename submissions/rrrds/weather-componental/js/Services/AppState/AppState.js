class AppState {
  constructor() {
    this.watchers = {
      // 'ENTITY': [ watcher1, watcher2 ],
    };
  }

  watch(entity, watcher) {
    if (this.watchers[entity]) {
      this.watchers[entity].push(watcher);
    } else {
      this.watchers[entity] = [watcher];
    }
  }

  update(entity, newValue) {
    if (this.watchers[entity]) {
      this.watchers[entity].forEach(watcher => watcher(newValue));
    }
  }
}

export const appState = new AppState();
