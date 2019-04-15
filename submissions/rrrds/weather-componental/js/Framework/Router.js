export default class Router {
  constructor(host, routes, component) {
    this.host = host;
    this.routes = routes;
    this.component = component;
  }

  init() {
    window.addEventListener('hashchange', this.handleUrlChange.bind(this));

    console.log(this.host);

    const app = new this.component(this.host);
    app.run();
  }

  handleUrlChange() {
    const pathArr = location.hash.split('/').slice(1);

    this.findRoute(pathArr);
  }

  findRoute(pathArr) {
    console.log(pathArr);
  }
}
