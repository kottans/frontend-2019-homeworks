import {Component} from "../../../framework/";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../../Services/WeatherDataService";


class FavouriteLocations extends Component {
    constructor(host, props) {
        super(host, props);
        this.props = props;
        AppState.watch('FAVOURITECITY', this.likesUpdate);
        AppState.watch('CURRENT', this.weatherCurrentUpdate);
    }

    componentWillMount() {
        [ 'handleDeleteAllLikes', 'handleItemClick', 'handleDeleteFavoriteItem', 'likesUpdate', 'weatherCurrentUpdate' ]
            .forEach(name => this[name] = this[name].bind(this));
        const localStorageHistory = localStorage.getItem('favourites')?JSON.parse(localStorage.getItem('favourites')):[];

        this.state = {likes: localStorageHistory};
    }
    weatherCurrentUpdate(weatherCurrent){
        if (weatherCurrent.id) {
            AppState.update('ISLIKED', {isLiked: this.isLiked(weatherCurrent.id)});
        }
    }

    isLiked(id) {
        return this.state.likes.some(item => `${id}` === item.id);
    }

    likesUpdate(likedCity) {
        if (this.isLiked(likedCity.id)) {
            this.updateState({
                likes: this.state.likes.filter(item => item.id !== likedCity.id)
            });
            AppState.update('ISLIKED', {isLiked: false});
        } else {
            this.updateState({
                likes: [
                    ...this.state.likes,
                    {
                        id: likedCity.id,
                        name: likedCity.name
                    }
                ]
            });
            AppState.update('ISLIKED', {isLiked: true});
        }
        this.persistLikesToLocalStorage();
    }

    handleDeleteFavoriteItem(e) {
        const currentItem = document.querySelector('.forecast__city');

        if (currentItem.id === e.target.dataset.id) {
            this.updateState({
                likes: this.state.likes.filter(item => item.id !== e.target.dataset.id)
            });
            AppState.update('ISLIKED', {isLiked: false});
        } else {
            this.updateState({
                likes: this.state.likes.filter(item => item.id !== e.target.dataset.id),
            });
        }
        this.persistLikesToLocalStorage();
    }

    handleDeleteAllLikes() {
        this.updateState({
            likes: [],
        });
        this.persistLikesToLocalStorage();
        AppState.update('ISLIKED', {isLiked: false});
    }

    handleItemClick(e) {
        if(+e.target.nextElementSibling.dataset.id !== this.state.id)
            WeatherDataService.subscribeForWeather(e.target.textContent.split(', '));
    }
    persistLikesToLocalStorage(){
        localStorage.setItem('favourites', JSON.stringify(this.state.likes))
    }
    render() {
        return [
            {
                tag: 'div',
                classList: ['favorite'],
                children: [
                    {
                        tag: 'div',
                        classList: ['favorite__header'],
                        children: [
                            {
                                tag: 'h4',
                                classList: ['favorite__title'],
                                content: '<i class="fas fa-star"></i> Favorite'
                            },
                            {
                                tag: 'button',
                                classList: ['favorite__delete'],
                                content: '<i class="far fa-trash-alt"></i>',
                                eventHandler: {
                                        click: this.handleDeleteAllLikes,
                                }
                            },
                        ]
                    },
                    {
                        tag: 'ul',
                        classList: ['favorite__list'],
                        children: this.state.likes ?
                            this.state.likes.map(item => {
                                return ({
                                    tag: 'li',
                                    children: [
                                        {
                                            tag: 'span',
                                            classList: ['favorite__list_name'],
                                            content: item.name,
                                            eventHandler: {
                                                    click: this.handleItemClick,
                                            }
                                        },
                                        {
                                            tag: 'button',
                                            classList: ['favorite__list_delete'],
                                            attributes: [{name: 'type', value: 'button'}, {name: 'data-id', value: item.id}],
                                            content: '',
                                            eventHandler: {
                                                    click: this.handleDeleteFavoriteItem,
                                            }
                                        }
                                    ]
                                })
                            })
                            :[],
                    },
                ]
            },
        ];
    }
}

export default FavouriteLocations;