import * as React from "react";
import {Input, InputTypes} from "../input";
import {SyntheticEvent} from "react";
import "./SearchForm.scss";
import classnames from "classnames";
import {Button} from "../button";
import {ButtonTypes} from "../../App";
// @ts-ignore
import search from "../../img/search-img.png";
// @ts-ignore
import asc from "../../img/sort-amount-asc.svg";
// @ts-ignore
import desc from "../../img/sort-amount-desc.svg";
import {Radio} from "../radio";
import {filterActionCreator} from "../../actions/filter";
import {connect} from "react-redux";
import {fetchInitItems} from "../../actions/submit";

export enum Sort {
    ASC = 'asc',
    DESC = 'desc'
}

interface Props {
    onSubmit: (searchInput: string, currentPage: number) => void;
    onChange: (filterInput: string, radioInput: string) => void;
    className: string;
    searchInput: string;
    radioInput: string;
}

interface State {
    searchInput: string;
    filterInput: string;
    radioInput: string;
}


class SearchForm extends React.Component<Props, State>{
    state = {
        searchInput: '',
        filterInput: '',
        radioInput: ''
    };
    componentDidMount(): void {
        const {searchInput, radioInput} = this.props;
        if(!searchInput)
            this.props.onSubmit('cars', 1);
        this.setState(state => ({...state, radioInput}), () => console.log(this.state));
    }

    private onFormChange = (e: SyntheticEvent<HTMLFormElement>) => {
        const { onChange } = this.props;
        const { searchInput } = this.state;
        const nextSearchInput = e.currentTarget['searchInput'].value;

        const inputs = Array.from(e.currentTarget.elements).filter((element:any) => {
            if(element && element['name']){
                return element['name'];
            }
            return null;
        });

        const value:any = inputs.reduce((acc:object, cur:any) => {
            if(cur.name){
                if(cur.name === 'radioInput'){
                    if(cur.checked === true){
                        return {...acc, [cur.name]: cur.id};
                    }
                    return acc;
                }else{
                    return {...acc, [cur.name]: cur.value};
                }
            }
            return acc;
        }, {});

        this.setState(state => ({...state, ...value}), () => {
            if(nextSearchInput === searchInput){
                onChange(this.state.filterInput, this.state.radioInput);
            }
        });
    };

    private onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {searchInput} = this.state;
        if(this.props.searchInput !== searchInput){
            this.props.onSubmit(searchInput, 1);
        }
    };

    render(){
        const classNames = classnames('search-form', 'native-form');
        return <form onSubmit={this.onSubmit}  className={classNames} onChange={this.onFormChange} >
                <div className={'search'}>
                    <Input
                        name={'searchInput'}
                        type = {InputTypes.TEXT}
                        label = {'Search'}
                    />
                    <Button type={ButtonTypes.SUBMIT} classNames={'btn-search'} > <img src={search} alt="Search" className={'icon-search'} /></Button>
                </div>
                <Input
                    name={'filterInput'}
                    type = {InputTypes.TEXT}
                    label = {'Filter'}
                />
                <div className={'search'}>
                    <Radio
                        id={'asc'}
                        name={'radioInput'}
                        defaultChecked={this.props.radioInput === Sort.ASC}
                        type = {InputTypes.RADIO}
                        label = {<img src={asc} />}
                    />
                    <Radio
                        id={'desc'}
                        name={'radioInput'}
                        defaultChecked={this.props.radioInput === Sort.DESC}
                        type = {InputTypes.RADIO}
                        label = {<img src={desc} />}
                    />
                </div>
            </form>
    }
}

const mapStateToProps = (state: any) => {
    return {
        searchInput: state.unsplash.searchInput,
        radioInput: state.unsplash.radioInput
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (searchInput: string, currentPage: number) => {
           dispatch(fetchInitItems( {searchInput, currentPage}))
        },
        onChange: (filterInput: string, radioInput: string) => {
            dispatch(filterActionCreator({filterInput: filterInput, radioInput: radioInput}))
        }
    }
};

const SearchFormWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchForm);

export {SearchFormWrapper as SearchForm};
