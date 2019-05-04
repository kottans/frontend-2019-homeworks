import React, {Suspense} from "react";
import {Image} from '../../types/API';
import './Grid.scss';
import {GridItem} from "../gridItem";
import {fetchItems} from "../../actions/unsplash";
import {connect} from "react-redux";
import {Button} from "../button";
import {ButtonTypes} from "../../App";
import {SearchForm} from "../searchForm";

interface Props {
    items: Array<Image>;
    total: number;
    filterInput: string;
    currentPage: number;
    searchInput: string;
    radioInput: string;

    onItemsAdded(searchInput: string, currentPage: number): void;
}

class Grid extends React.PureComponent<Props, {}> {

    private loadImages = () => {
        const currentPage = this.props.currentPage + 1;
        this.props.onItemsAdded(this.props.searchInput, currentPage)
    };

    private handleSortAndFilter() {
        const {items, filterInput, radioInput} = this.props;
        const filteredItems = [...items as any].filter(item => {
            const regex = new RegExp(filterInput, 'gi');
            return item.alt_description.match(regex);
        });
        const sorting = (a:{alt_description:string}, b:{alt_description:string}):number => (a.alt_description > b.alt_description ? 1 : -1);
        const handleSorting:{ [radioInput:string] : (a:{alt_description:string}, b:{alt_description:string}) => number } = {
            asc: (a, b) => sorting(a, b),
            desc: (a, b) => sorting(b, a)
        };
        return  filteredItems.sort((a, b) => handleSorting[radioInput](a, b));
    };

    render() {
        const {items, total} = this.props;
        return <>
            <Suspense fallback={<div>Loading...</div>}>
                <div className={'nav__container'}>
                    <SearchForm className='nav__search-form'/>
                </div>
                <div className={'grid'}>
                    {
                        this.handleSortAndFilter()
                            .map((item: { alt_description: string; urls: { small: string }; likes: number; id: string; }) => {
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
            {items && items.length > 0 && total > items.length ?
                <Button className="native-button" type={ButtonTypes.BUTTON} onClick={this.loadImages}>Show
                    more {total ? `(${items.length} of ${total})` : ''}</Button>
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
        onItemsAdded: (searchInput: string, currentPage: number) => {
            dispatch(fetchItems({searchInput, currentPage}))
        }
    }
};

const GridWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);

export {GridWrapper as Grid};

