import * as React from "react";
import { Input } from "../input";
import { SyntheticEvent } from "react";
import "./SearchForm.scss";
import classnames from "classnames";
import { Button } from "../button";
import { ButtonTypes } from "../../App";
import search from "../../img/search-img.png";
import asc from "../../img/sort-amount-asc.svg";
import desc from "../../img/sort-amount-desc.svg";
import { Radio } from "../radio";
import { filterActionCreator } from "../../actions/filter";
import { connect } from "react-redux";
import { fetchInitItems } from "../../actions/submit";
import { Dispatch } from "redux";

export enum Sort {
  ASC = "asc",
  DESC = "desc"
}

interface Props {
  onSubmit: (searchInput: string, currentPage: number) => void;
  onChange: (filterInput: string, sortingParam: string) => void;
  className: string;
  searchInput: string;
  sortingParam: string;
}

interface State {
  searchInput: string;
  filterInput: string;
  sortingParam: string;
}

interface Target extends HTMLInputElement {
  name: string;
  value: string;
}

class SearchForm extends React.Component<Props, State> {
  state = {
    searchInput: "",
    filterInput: "",
    sortingParam: ""
  };

  componentDidMount(): void {
    const { searchInput, sortingParam } = this.props;
    if (!searchInput) this.props.onSubmit("cars", 1);
    this.setState({ sortingParam });
  }

  private onFormChange = (e: SyntheticEvent<HTMLFormElement>) => {
    const { onChange } = this.props;
    const target = e.target as Target;
    const targetValue =
      target.name === "sortingParam" ? target.id : target.value;
    this.setState(
      state => ({
        ...state,
        [target.name]: targetValue
      }),
      () => {
        onChange(this.state.filterInput, this.state.sortingParam);
      }
    );
  };

  private onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchInput } = this.state;
    if (this.props.searchInput !== searchInput) {
      this.props.onSubmit(searchInput, 1);
    }
  };

  render() {
    const classNames = classnames("search-form", "native-form");
    return (
      <form
        onSubmit={this.onSubmit}
        className={classNames}
        onChange={this.onFormChange}
      >
        <div className="search">
          <Input name="searchInput" type="text" label="Search" />
          <Button type={ButtonTypes.SUBMIT} classNames={"btn-search"}>
            {" "}
            <img src={search} alt="Search" className={"icon-search"} />
          </Button>
        </div>
        <Input name="filterInput" type="text" label="Filter" />
        <div className="search">
          <Radio
            id="asc"
            name="sortingParam"
            defaultChecked={this.props.sortingParam === Sort.ASC}
            type="radio"
            label={<img src={asc} />}
          />
          <Radio
            id="desc"
            name="sortingParam"
            defaultChecked={this.props.sortingParam === Sort.DESC}
            type="radio"
            label={<img src={desc} />}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: { unsplash: State }) => {
  return {
    searchInput: state.unsplash.searchInput,
    sortingParam: state.unsplash.sortingParam
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (searchInput: string, currentPage: number) => {
      dispatch(fetchInitItems({ searchInput, currentPage }));
    },
    onChange: (filterInput: string, sortingParam: string) => {
      dispatch(
        filterActionCreator({
          filterInput: filterInput,
          sortingParam: sortingParam
        })
      );
    }
  };
};

const SearchFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);

export { SearchFormWrapper as SearchForm };
