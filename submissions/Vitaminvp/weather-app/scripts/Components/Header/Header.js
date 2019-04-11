import {Component} from "../../framework/";
import {SearchBar} from "./SearchBar/";
import {UnitSelect} from "./UnitSelect/";
import {FavoritesButton} from "./FavoritesButton/";

class Header extends Component{
    constructor(host, props) {
        super(host, props);
        this.props = props;
    }
    render() {
        return [
            {
                tag: 'header',
                content: '',
                children: [
                    {
                        tag: 'div',
                        content: '',
                        classList: ['container'],
                        children: [
                            {
                                tag: 'div',
                                classList: ['row', 'search'],
                                children: [
                                    {tag: 'div', classList: ['col-12'], content: '<h1>Weather App</h1>'},
                                    {
                                        tag: 'div',
                                        classList: ['col-8'],
                                        children: [
                                            {
                                                tag: SearchBar,
                                                props: { onFormSubmit: this.props.onFormSubmit }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        classList: ['col-2'],
                                        children: [
                                            {
                                                tag: UnitSelect,
                                                props: {
                                                    handleUnitChange: this.props.handleUnitChange,
                                                    unit: this.props.unit
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        classList: ['col-2'],
                                        children: [
                                            {
                                                tag: FavoritesButton,
                                                props: {
                                                    onCityLike: this.props.onCityLike,
                                                    isLiked: this.props.isLiked
                                                }
                                            }
                                        ]
                                    },
                                ],
                            },

                        ]
                    },
                ]
            },
        ];
    }
}

export default Header;