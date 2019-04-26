import React, {Suspense} from "react";
import {Image} from '../../types/API';
import './Grid.scss';
import {GridItem} from "../gridItem";
import {fetchItems} from "../../actions/unsplash";
import {connect} from "react-redux";
import {Button} from "../button";
import {ButtonTypes} from "../../App";
import {SearchForm, Sort} from "../searchForm";
import {array} from "prop-types";

interface Props {
    items: Array<Image>;
    total: number;
    filterInput: string;
    currentPage: number;
    searchInput: string;
    radioInput: string;
    onAddItems: (searchInput: string, currentPage: number)=> void;
}

class Grid extends React.PureComponent<Props, {}> {

    private loadImages = () => {
        const currentPage = this.props.currentPage + 1;
        this.props.onAddItems(this.props.searchInput, currentPage)
    };

    render() {
        const { items, total, filterInput, radioInput} = this.props;
        let filteredItems:any = [];
        if(Array.isArray(items)){
            filteredItems = [...items as any].filter(item => {
                if (item.alt_description) {
                    const regex = new RegExp(filterInput, 'gi');
                    return item.alt_description.match(regex);
                } else {
                    return true;
                }
            });
        }

        const sortedItems = radioInput === Sort.DESC
            ? filteredItems.sort((a:any, b:any):any => b.alt_description - a.alt_description ? -1 : 1)
            : filteredItems.sort((a:any, b:any):any => b.alt_description - a.alt_description ? 1 : -1);

        return <>
            <Suspense fallback={<div>Loading...</div>}>
                <div className={'nav__container'}>
                    <SearchForm  className='nav__search-form'/>
                </div>
                <div className={'grid'}>
                    {
                        sortedItems.map((item: { alt_description: any; urls: any; likes: any; id: any; }) => {
                            const {alt_description, urls, likes, id} = item;
                            return <GridItem className={'grid__item'}
                                             key={id}
                                             id={id}
                                             url={urls.small}
                                             description={alt_description}
                                             likes={likes}/>
                        })
                    }
                </div>
            </Suspense>
            {items && items.length > 0 && total > items.length?
                <Button className="native-button" type={ButtonTypes.BUTTON} onClick={this.loadImages} >Show more {total ? `(${items.length} of ${total})` : ''}</Button>
                : null
            }
            </>
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.unsplash.items,
        total: state.unsplash.total,
        searchInput: state.unsplash.searchInput,
        filterInput: state.unsplash.filterInput,
        currentPage: state.unsplash.currentPage,
        radioInput: state.unsplash.radioInput,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddItems: (searchInput: string, currentPage: number) => {
            dispatch(fetchItems( {searchInput, currentPage}))
        }
    }
};

const GridWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);

export {GridWrapper as Grid};

