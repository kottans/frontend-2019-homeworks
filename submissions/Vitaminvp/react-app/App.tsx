import React, {Component} from 'react';
import './App.scss';
import {Grid} from "./Components/grid";
import {Image} from "./Components/image";
import {Auth} from "./Components/auth";
import {Nav} from "./Components/nav";
import {Route, RouteChildrenProps, Switch} from "react-router";
import {NavLink} from "react-router-dom";

export enum ButtonTypes {
    SUBMIT = 'submit',
    BUTTON = 'button'
}

const Notfound = () => <div className={'notfound'}><h2>Not Found</h2></div>;

const routes = [
    {
        title: 'home',
        path: '/',
        exact: true,
        Component: Grid
    },
    {
        title: 'about',
        exact: false,
        path: '/about',
        Component: () => <h1>Some text</h1>
    },
    {
        title: 'auth',
        exact: false,
        path: '/auth',
        Component: Auth
    },
    {
        path: '/image/:id',
        exact: false,
        Component: Image
    },
    {
        title: 'Contacts',
        exact: false,
        path: '/contacts',
        Component: () => <h1>Contacts component</h1>
    },
];

class App extends Component {
    render() {
        return <div className={'app-wrapper'}>
            <Nav>
                {
                    routes.map((route, i) => <NavLink exact key={i} to={route.path}>{route.title}</NavLink>)
                }
            </Nav>
            <Switch>
                {
                    routes.map(({path, exact, Component, title}) => (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={(routeProps) => <Component {...routeProps} />}
                        />
                    ))
                }
                <Route component={Notfound}/>
            </Switch>
        </div>;
    }
}

export default App;

