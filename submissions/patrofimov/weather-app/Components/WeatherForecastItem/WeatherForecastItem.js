import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    let dataR = this.props;

    return `<div class="wf-item">
    
    <div class="wf-icon">
    <img src=${dataR.ready ? dataR.icon : ""}  class ="wt-fc-icon-img" />
    </div>
    <div class="wf-descr">${dataR.ready ? dataR.descr : ""}</div>
    <div class="wf-temp">${
      dataR.ready ? dataR.temp.value + dataR.temp.unit : ""
    }</div>
    <div class="wf-time">${dataR.ready ? dataR.time : ""}</div>
    <div class="wf-date">${dataR.ready ? dataR.dt : ""}</div></div>    
    `;
  }
}

ComponentFactory.register(WeatherForecastItem);
