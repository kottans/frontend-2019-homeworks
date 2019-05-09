import React, {Suspense} from "react";
import {Image} from '../../types/API';
import './Grid.scss';
import {GridItem} from "../gridItem";
import {fetchItems} from "../../actions/unsplash";
import {connect} from "react-redux";
import {Button} from "../button";
import {ButtonTypes} from "../../App";
import {SearchForm} from "../searchForm";
import {Dispatch} from "redux";

interface Props {
    items: Array<Image>;
    total: number;
    filterInput: string;
    currentPage: number;
    searchInput: string;
    sortingParam: string;

    onItemsAdded(searchInput: string, currentPage: number): void;
}

class Grid extends React.PureComponent<Props, {}> {

    private loadImages = () => {
        const currentPage = this.props.currentPage + 1;
        this.props.onItemsAdded(this.props.searchInput, currentPage)
    };

    private handleFilter() {
        const {items, filterInput} = this.props;
        return [...items as Array<Image>].filter(item => {
            return item.alt_description.toLowerCase().includes(filterInput.toLowerCase());
        });
    };

    private handleSort() {
        const {items, sortingParam} = this.props;
        const sorting = (a: { alt_description: string }, b: { alt_description: string }): number => (a.alt_description > b.alt_description ? 1 : -1);
        const handleSorting: { [sortingParam: string]: (a: { alt_description: string }, b: { alt_description: string }) => number } = {
            asc: (a, b) => sorting(a, b),
            desc: (a, b) => sorting(b, a)
        };
        return items.sort((a, b) => handleSorting[sortingParam](a, b));
    };

    render() {
        const {items, total} = this.props;
        const isButtonVisible = items && (items.length > 0) && (total > items.length);
        this.handleSort();
        return <>
            <Suspense fallback={<div>Loading...</div>}>
                <div className={'nav__container'}>
                    <SearchForm className='nav__search-form'/>
                </div>
                <div className={'grid'}>
                    {
                        this.handleFilter()
                            .map((item: { alt_description: string; urls: { small: string }; likes: number; id: string; }) => {
                                const {alt_description, urls, likes, id} = item;
                                return <GridItem classNames='grid__item'
                                                 key={id}
                                                 id={id}
                                                 url={urls.small}
                                                 description={alt_description}
                                                 likes={likes}/>
                            })
                    }
                </div>
            </Suspense>
            {isButtonVisible ?
                <Button className="native-button" type={ButtonTypes.BUTTON} onClick={this.loadImages}>Show
                    more {total ? `(${items.length} of ${total})` : ''}</Button>
                : null
            }
        </>
    }
}

const mapStateToProps = (state: { unsplash: Props }) => {
    return {
        items: state.unsplash.items,
        total: state.unsplash.total,
        currentPage: state.unsplash.currentPage,
        searchInput: state.unsplash.searchInput,
        filterInput: state.unsplash.filterInput,
        sortingParam: state.unsplash.sortingParam
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onItemsAdded: (searchInput: string, currentPage: number) => {
            dispatch(fetchItems({searchInput, currentPage}))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);



