import * as React from "react";
import "./Radio.scss";
import {InputTypes} from "../input";
import classnames from "classnames";


interface IProps {
    type: InputTypes,
    value?: string,
    onChange?: (value: string, name: string) => void
    name?: string
    label?: any
    id?: string
    defaultChecked?: boolean
}

export const Radio: React.FunctionComponent<IProps> = ({ name, label, type, id, defaultChecked }) => {
    const classNames = classnames('input__native-group', 'input__native-radio', 'input__native-radio-inline')
    return <div className={classNames}>
                <input id={id} type={type} name={name} defaultChecked={ defaultChecked }/>
                <label htmlFor={id}>{label}</label>
        </div>
};

