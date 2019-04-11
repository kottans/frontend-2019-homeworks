import {Component} from "../../../framework/";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../../Services/WeatherDataService";


class SearchHistory extends Component{
    constructor(host, props) {
        super(host, props);
        this.props = props;
        AppState.watch('CURRENT', this.historyUpdate);
    }

    componentWillMount() {
        ['handleDeleteHistoryItem', 'handleDeleteAllHistory', 'handleItemClick', 'historyUpdate']
            .forEach(name => this[name] = this[name].bind(this));
        const localStorageHistory = localStorage.getItem('history')?JSON.parse(localStorage.getItem('history')):[];
        this.state = {
            history: localStorageHistory
        };
    }

    historyUpdate(weatherData) {
        if (weatherData.id && (!this.state.history.length || this.state.history[this.state.history.length - 1].id !== weatherData.id)) {
            const dataId = Math.random().toString(36).substr(2, 9);
            this.updateState({
                ...weatherData,
                history: [
                    ...this.state.history,
                    {
                        id: weatherData.id,
                        dataId,
                        name: `${weatherData.name}, ${weatherData.sys.country}`
                    }
                ],
            });
        } else {
            this.updateState({...weatherData});
        }
        this.persistHistoryToLocalStorage();
    }


    handleDeleteAllHistory() {
        this.updateState({
            history: []
        });
        this.persistHistoryToLocalStorage();
    }

    handleDeleteHistoryItem(e) {
        this.updateState({
            history: this.state.history.filter(item => item.dataId !== e.target.dataset.dataid)
        });
        this.persistHistoryToLocalStorage();
    }

    handleItemClick(e) {
        if(e.target.nextElementSibling.dataset.id !== this.state.id)
            WeatherDataService.subscribeForWeather(e.target.textContent.split(', '));
    }

    isInHistory() {
        return this.state.history.some(item => this.state.id === item.id);
    }

    persistHistoryToLocalStorage(){
        localStorage.setItem('history', JSON.stringify(this.state.history))
    }
    render() {
        return [
            {
                tag: 'div',
                classList: ['recent'],
                children: [
                    {
                        tag: 'div',
                        classList: ['recent__header'],
                        children: [
                            {
                                tag: 'h4',
                                classList: ['recent__title'],
                                content: '<i class="fas fa-history"></i> Recently viewed'
                            },
                            {
                                tag: 'button',
                                classList: ['recent__delete'],
                                content: '<i class="far fa-trash-alt"></i>',
                                eventHandler: {
                                        click: this.handleDeleteAllHistory,
                                }
                            },
                        ]
                    },
                    {
                        tag: 'ul',
                        classList: ['recent__list'],
                        children: this.state.history ?
                            this.state.history.map(item => {
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
                                            attributes: [
                                                {name: 'type', value: 'button'},
                                                {name: 'data-id', value: item.id},
                                                {name: 'data-dataId', value: item.dataId}
                                                ],
                                            content: '&nbsp;',
                                            eventHandler: {
                                                    click: this.handleDeleteHistoryItem,
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

export default SearchHistory;