import * as React from "react";
import "./Radio.scss";
import classnames from "classnames";
import { ReactNode } from "react";

interface IProps {
  type: string;
  value?: string;
  onChange?: (value: string, name: string) => void;
  name?: string;
  label?: ReactNode;
  id?: string;
  defaultChecked?: boolean;
}

export const Radio: React.FunctionComponent<IProps> = ({
  name,
  label,
  type,
  id,
  defaultChecked
}) => {
  const classNames = classnames(
    "input__native-group",
    "input__native-radio",
    "input__native-radio-inline"
  );
  return (
    <div className={classNames}>
      <input id={id} type={type} name={name} defaultChecked={defaultChecked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
