import React, {Component} from 'react';


const History = (props) => {
  return (
      <div className={"history wrapperStyle"}>
          <h1 className={"citites__title"}>History</h1>
          {props.history.slice(-5).reverse().map(item => {
              if(item.name)
                  return (<li key={new Date().getTime()+Math.random()}>
                      <a href="#"
                         onClick={() => props.itemClick(item)}
                      >
                          {`${item.name},${item.sys.country}`}
                      </a>
                  </li>)
          })}
      </div>
  )
};

export default History;