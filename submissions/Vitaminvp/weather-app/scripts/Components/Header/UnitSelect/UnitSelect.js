import {Component} from "../../../framework";
import AppState from "../../../Services/AppState";

class UnitSelect extends Component {
    constructor(host, props) {
        super(host, props);
        this.props = props;
        AppState.watch('UNIT', this.unitUpdate);
    }

    componentWillMount() {
        const localStorageUnit = localStorage.getItem('unit')?JSON.parse(localStorage.getItem('unit')):'CE';
        this.state = {
            unit: localStorageUnit
        };
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.unitUpdate = this.unitUpdate.bind(this);
    }

    unitUpdate(unit){
        this.updateState(unit);
    }

    handleUnitChange(e) {
        AppState.update('UNIT', {unit: e.target.value});
        this.persistUnitToLocalStorage()
    }

    persistUnitToLocalStorage(){
        localStorage.setItem('unit', JSON.stringify(this.state.unit))
    }


    render() {
        const unit = this.state.unit;
        return [
            {
                tag: 'label',
                classList: 'search__units_label',
                attributes: [
                    {name: 'for', value: 'units'},
                ],
                children: [
                    {
                        tag: 'select',
                        classList: 'search__units',
                        attributes: [
                            {name: 'id', value: 'units'},
                            {name: 'title', value: 'Select units'},
                            {name: 'value', value: this.state.unit},
                        ],
                        eventHandler: {
                                change: this.handleUnitChange,
                        },
                        children: [
                            {
                                tag: 'option',
                                content: '&deg;C',
                                attributes: [
                                    {name: 'value', value: 'CE'},
                                    unit === 'CE' ? {name: 'selected', value: ''} : {},
                                ],
                            },
                            {
                                tag: 'option',
                                content: '&deg;F',
                                attributes: [
                                    {name: 'value', value: 'FA'},
                                    unit === 'FA' ? {name: 'selected', value: ''} : {},
                                ],
                            },
                            {
                                tag: 'option',
                                content: 'K',
                                attributes: [
                                    {name: 'value', value: 'KE'},
                                    unit === 'KE' ? {name: 'selected', value: ''} : {},
                                ],
                            },
                        ],
                    }
                ]
            },
        ];
    }
}

export default UnitSelect;