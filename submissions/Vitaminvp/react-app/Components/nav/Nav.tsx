import React, {ReactNode} from "react";
import './Nav.scss';
import { SearchForm } from "../searchForm";

export const Nav: React.FunctionComponent<any> = ({children}) => {

    return <nav className={'nav'}>
        <ul className={'nav-menu'}>
            {React.Children.map<ReactNode, any>(children,(child:any) => {
                return <li key={child.props.children}>{React.cloneElement(child)}</li>
            }
            )}
        </ul>


        </nav>;
};