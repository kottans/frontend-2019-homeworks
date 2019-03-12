import Component from "../../framework/Component";
export default class Humidity extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return this.props.humidity + '%';
  }
}
