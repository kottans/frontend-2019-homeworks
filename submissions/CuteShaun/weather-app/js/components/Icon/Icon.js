import Component from "../../framework/Component";
import { attribute } from "postcss-selector-parser";

export default class Icon extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: "img",
        classList: [`${this.props.class}`],
        attributes: [
          {
            name: "alt",
            value: this.props.alt
          },

          {
            name: "src",
            value: this.props.src
          }
        ]
      }
    ];
  }
}
