import { Component, ComponentFactory, parseJSX } from 'recat';

export default class UnitsButton extends Component {
  render() {
    return parseJSX`
      <label class={button-unit}>
        <div class={${
          this.props.unit === 'metric'
            ? 'button-unit__type button-unit__type--current'
            : 'button-unit__type'
        }}>C</div>
        <div class={${
          this.props.unit === 'imperial'
            ? 'button-unit__type button-unit__type--current'
            : 'button-unit__type'
        }}>F</div>
        <input
          class={visualy-hidden}
          type={checkbox}
          name={units}
          value={}
          onChange={${this.props.handleUnitsChange}}
          title={} />`;
  }
}

ComponentFactory.register(UnitsButton);
