import React from "react";
import {AuthAction, setToken} from "../../actions/auth";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteChildrenProps} from "react-router";
import {Button} from "../button";
import {ButtonTypes} from "../../App";
import {config} from "../../configs";
import "./Auth.scss";
import {authState} from "../../reducers/auth";

interface IProps extends RouteChildrenProps {
    setToken(code: string): void;

    isAuthenticated: boolean;
    token: string
}

interface State {
    auth: authState
}

class Auth extends React.Component<IProps> {
    componentDidMount() {
        const {search} = this.props.location;
        const params = new URLSearchParams(search);
        const code = params.get('code');
        if (code) {
            this.props.setToken(code);
        }
    }

    private handleClick = async () => {
        window.location.href = `${config.oAuthAll}`;
    };

    render() {
        const {isAuthenticated, token} = this.props;
        return <>
            {
                isAuthenticated
                    ? <div><h2 className={'textCenter'}>You are logged</h2><h3>Token: {token}</h3></div>
                    : <Button className="native-button" type={ButtonTypes.BUTTON}
                              onClick={this.handleClick}>LogIn</Button>
            }
        </>
    }
};

const mapStateToProps = (state: State): authState => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
});

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
    return {
        setToken: (code: string) => dispatch(setToken(code))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

