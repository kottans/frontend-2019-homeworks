import React, {Suspense} from "react";
import "./Image.scss";
import {connect} from "react-redux";
import {fetchImage} from "../../actions/image";

interface IProps {
    item: any,
    match: any,
    onLoad: (id: string) => void
}

interface IState {
}

class Image extends React.Component<IProps, {}>{
    componentDidMount(){
        this.props.onLoad(this.props.match.params.id);
    }
    render(){
        const {alt_description, user, urls} = this.props.item;
        return <Suspense fallback={<div>Loading...</div>}>
            <article >
                <div className="info">
                    <h2>{name}</h2>
                    <h4>{alt_description}</h4>
                    <i>{user?user.name:null}</i>
                    <img src={urls?urls.regular:null} alt="" />
                </div>
            </article>
        </Suspense>
    }
}

const mapStateToProps = (state: any) => {
    return {
        item: state.unsplash.item
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoad: (imageId: string) => {
            dispatch(fetchImage( {imageId}))
        },
    }
};

const ImageWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Image);

export {ImageWrapper as Image};