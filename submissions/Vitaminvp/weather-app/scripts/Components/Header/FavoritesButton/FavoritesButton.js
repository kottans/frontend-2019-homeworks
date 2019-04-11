import {Component} from "../../../framework";
import AppState from "../../../Services/AppState";
import {CLASSES, renderLoader} from "../../../../Services/constants";

class FavoritesButton extends Component {
    constructor(host, props) {
        super(host, props);
        this.props = props;
        AppState.watch('ISLIKED', this.isLikedUpdate);
    }

    componentWillMount() {
        this.isLikedUpdate = this.isLikedUpdate.bind(this);
        this.onCityLike = this.onCityLike.bind(this);
        this.state = {isLiked: false};
    }

    isLikedUpdate(isLiked){
        this.updateState({isLiked: isLiked.isLiked});
    }

    onCityLike() {
        const currentItem = document.querySelector(CLASSES.currentWeatherItem);
        if (currentItem) {
            AppState.update('FAVOURITECITY', {
                id:currentItem.id,
                name: currentItem.textContent
            });
        }
    }

    render() {
        const star = this.state.isLiked ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        return [
            {
                tag: 'button',
                classList: ['search__star'],
                content: star,
                attributes: [
                    {name: 'type', value: 'button'},
                    {name: 'title', value: 'Add to favorite'},
                ],
                eventHandler: {
                    click: this.onCityLike
                }
            },
        ];
    }
}

export default FavoritesButton;