import Component from "../../../framework/Component";
import {FavouriteLocations} from "../FavouriteLocations/index";
import {SearchHistory} from "../SearchHistory/index";

export default class LocationsList extends Component {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return [
            {
                tag: 'label',
                classList: ['favor-hist__icon'],
                attributes: [
                    {
                        name: "for",
                        value: 'favor-hist__checkbox',
                    }
                ]
            },
            {
                tag: "input",
                attributes: [
                    {
                        name: "id",
                        value: "favor-hist__checkbox",
                    },
                    {
                        name: "type",
                        value: "checkbox"
                    },
                    {
                        name: "name",
                        value: "favor-hist__checkbox"
                    }
                ]
            },
            {
                tag: "div",
                classList: ["favor-hist"],
                children: [
                    {
                        tag: "h3",
                        content: "Favourite"
                    },
                    {
                        tag: FavouriteLocations,
                    },
                    {
                        tag: "hr"
                    },
                    {
                        tag: "h3",
                        content: "History"
                    },
                    {
                        tag: SearchHistory,
                    }
                ]
            }
        ];
    }
}


