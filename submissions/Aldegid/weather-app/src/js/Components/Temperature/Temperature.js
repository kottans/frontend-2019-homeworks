import Component from "../../framework/Component";

export default class Temperature extends Component {
  constructor(host, props) {
    super(host, props);
  }


  render() {
    return  [
      this.props.temperature + '&deg;'
    ]
  }
}
