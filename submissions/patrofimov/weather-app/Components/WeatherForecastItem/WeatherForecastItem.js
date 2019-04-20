import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    const result = this.props;

    return `<div class="wf-item">
    
    <div class="wf-icon">
    <img src=${result.isReady ? result.icon : ""}  class ="wt-fc-icon-img" />
    </div>
    <div class="wf-descr">${result.isReady ? result.descr : ""}</div>
    <div class="wf-temp">${
      result.isReady ? result.temp.value + result.temp.unit : ""
    }</div>
    <div class="wf-time">${result.isReady ? result.time : ""}</div>
    <div class="wf-date">${result.isReady ? result.dt : ""}</div></div>    
    `;
  }
}

ComponentFactory.register(WeatherForecastItem);
