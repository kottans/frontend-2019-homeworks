import Component from "../../framework/Component";
export default class Pressure extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return this.props.pressure + 'atm';
  }
}
