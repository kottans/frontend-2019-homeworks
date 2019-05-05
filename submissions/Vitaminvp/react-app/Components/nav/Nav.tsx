import React, {ReactElement, ReactNode} from "react";
import './Nav.scss';

export const Nav: React.FunctionComponent<ReactNode> = ({children}) => {

    return <nav className={'nav'}>
        <ul className={'nav-menu'}>
            {React.Children.map(children as ReactElement, (child:React.ReactElement) => {
                    return <li key={child!.props.children}>{React.cloneElement(child)}</li>
                }
            )}
        </ul>
    </nav>;
};
