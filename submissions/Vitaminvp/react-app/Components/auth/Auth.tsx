import React from "react";
import {AuthAction, setToken} from "../../actions/auth";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteChildrenProps} from "react-router";
import {Button} from "../button";
import {ButtonTypes} from "../../App";
import {config} from "../../configs";
import "./Auth.scss";


interface IProps extends RouteChildrenProps{
    set_Token(code:string): void;// => Dispatch<AuthAction>
    isAuthenticated: boolean;
    token: string
}

class Auth extends React.Component<IProps, any>{
    componentDidMount(): void {
        const { search } = this.props.location;
        let code = search.slice(search.indexOf('=') + 1);
        if(code){
            this.props.set_Token(code);
        }
    }

    private handleClick = async () => {
        window.location.href = `${config.oAuthAll}`;
    };

    render(): React.ReactNode {
        const { isAuthenticated, token } = this.props;
        return <>
            {isAuthenticated?
                <div><h2 className={'textCenter'}>You are logged</h2><h3>Token: {token}</h3></div>
                :<Button className="native-button" type={ButtonTypes.BUTTON} onClick={this.handleClick} >LogIn</Button>}

        </>
    }
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    }
};


const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
    return {
        set_Token: (code: string) => dispatch(setToken(code))
    }
};
const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);

export  {AuthContainer as Auth};
