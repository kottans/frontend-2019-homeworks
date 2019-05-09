import React, {Suspense} from "react";
import "./Image.scss";
import {connect} from "react-redux";
import {fetchImage} from "../../actions/image";
import {Dispatch} from "redux";
import {UnsplashState} from "../../reducers/unsplash";
import {Image as Item} from "../../types/API";

interface IProps {
    imageItem?: Item
    match: MatchProps,
    onLoad(id: string): void
}
export interface Params {
    id: string;
}

export interface MatchProps {
    params: Params;
}

class Image extends React.Component<IProps>{
    componentDidMount(){
        this.props.onLoad(this.props.match.params.id);
    }
    render(){
        if(this.props.imageItem){
            const {alt_description, user, urls} = this.props.imageItem;
            return <Suspense fallback={<div>Loading...</div>}>
                <article >
                    <div className="info">
                        <h4>{alt_description}</h4>
                        <i>{user?user.name:null}</i>
                        <img src={urls?urls.regular:''} alt="" />
                    </div>
                </article>
            </Suspense>
        } else {
            return null;
        }

    }
}

const mapStateToProps = (state: {unsplash: UnsplashState}) => {
    return {
        imageItem: state.unsplash.item
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLoad: (imageId: string) => {
            dispatch(fetchImage( {imageId}))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Image);
