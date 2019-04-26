import React, {ButtonHTMLAttributes} from "react";
import './Button.scss';
import classnames from "classnames";
import {ButtonTypes} from "../../App";


interface IProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
    classNames?: string,
    type?: ButtonTypes
}

export const Button: React.FunctionComponent<IProps> = ({ children, classNames, ...props }) => {
    const classes = classnames('btn', classNames);
    return <button className={ classes } {...props}>
        <span>{children}</span>
    </button>
};