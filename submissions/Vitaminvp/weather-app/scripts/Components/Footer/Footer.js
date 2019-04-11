import {Component} from "../../framework/";
import {FavouriteLocations} from "./FavouriteLocations";
import {SearchHistory} from "./SearchHistory";


class Footer extends Component{
    constructor(host, props) {
        super(host, props);
        this.props = props;
    }
    render() {
        return [
            {
                tag: 'footer',
                content: '',
                children: [
                    {
                        tag: 'div',
                        content: '',
                        classList: ['container'],
                        children: [
                            {
                                tag: 'div',
                                classList: ['row'],
                                children: [
                                    {
                                        tag: 'div',
                                        classList: ['col-6'],
                                        children: [
                                            {
                                                tag: FavouriteLocations,
                                                props: {
                                                    likes: this.props.likes,
                                                    handleDeleteAllLikes: this.props.handleDeleteAllLikes,
                                                    handleItemClick: this.props.handleItemClick,
                                                    handleDeleteFavoriteItem: this.props.handleDeleteFavoriteItem,
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        classList: ['col-6'],
                                        children: [
                                            {
                                                tag: SearchHistory,
                                                props: {
                                                    history: this.props.history,
                                                    handleDeleteHistoryItem: this.props.handleDeleteHistoryItem,
                                                    handleItemClick: this.props.handleItemClick,
                                                    handleDeleteAllHistory: this.props.handleDeleteAllHistory
                                                }
                                            },
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

export default Footer;