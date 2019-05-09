import React from "react";
import "./GridItem.scss";

interface IProps {
  url: string;
  id: string;
  description: string;
  likes: number;
  link?: string;
  height?: number;
  classNames?: string;
}

interface IState {
  value: string;
}

export class GridItem extends React.Component<IProps, IState> {
  render() {
    const {
      url,
      likes,
      link,
      description,
      classNames,
      height,
      id
    } = this.props;
    const titleStyle = {
      height: `${height}px`
    };

    return (
      <article className={classNames}>
        <a className="title" href={`#/image/${id}`} style={titleStyle}>
          {description}
        </a>
        <div className="image">
          <img src={url} alt="" />
        </div>
      </article>
    );
  }
}
