import Component from "../../framework/Component";
export default class Wet extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return this.props.wet + '%';
  }
}
