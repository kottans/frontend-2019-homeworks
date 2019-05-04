import * as React from "react";
import {SyntheticEvent} from "react";
import "./Input.scss";

export enum InputTypes {
    TEXT = 'text',
    RADIO = 'radio',
    NUMBER = 'number',
    PASSWORD = 'password',
    PHONE = 'phone'
}

interface IProps {
    type: InputTypes,
    value?: string,
    onChange?: (value: string, name: string) => void
    name: string
    label: string
}

export const Input: React.FunctionComponent<IProps> = ({ name, label, type }) => {

    return <div className={'input__native-group'}>
            <input
                name={name}
                type={type}
                className={'input__native-input'}
                autoComplete="off"
                onFocus={(e)=> e.currentTarget.value = ''}
            />
            <label className="input__native-label">{label}</label>
            <span className="input__native-highlight">&nbsp;</span>
            <span className="input__native-bar">&nbsp;</span>
        </div>
};
