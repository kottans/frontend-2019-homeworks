import Component from "../../../framework/Component";

export default class WeatherForecastItem extends Component {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        const {main, date, icon, temp, unit, wind, description} = this.props;
        return [
            {
                tag: "div",
                children: [
                    {
                        tag: "h2",
                        content: main
                    },
                    {
                        tag: "p",
                        content: date
                    }
                ]
            },
            {
                tag: "img",
                classList: "days-3__img",
                attributes: [
                    {
                        name: "src",
                        value: `http://openweathermap.org/img/w/${icon}.png`
                    }
                ]
            },
            {
                tag: "ul",
                children: [
                    {
                        tag: "li",
                        content: `${temp}&deg;${unit}`
                    },
                    {
                        tag: "li",
                        content: `${wind} m/s`
                    }
                ]
            },
            {
                tag: "p",
                classList: "weather__days-3__description",
                content: description
            }
        ];
    }
}
