import React from "react";
import Statistics from "./Statistics";
import './styles.css';

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

function fetchAccount(repoName) {
    let url = `https://api.github.com/users/${repoName}`;
    return fetch(url).then(r => r.json());
}

function fetchRepos(repoName) {
  let url = `https://api.github.com/users/${repoName}/repos?sort=updated&direction=desc`;

  return fetch(url).then(r => r.json());
}

export default class App extends React.Component {
  state = {
    repoName: "",
    repos: {},
    error: null,
    info:{},
  };
  renderList (props) {
      return (
          <ul>
              {Array.from(props).map((item)=>(
                  <li key={item.id}>{item.name} <strong>({item.language ? item.language : 'mixed'})</strong>  {item.size} KB</li>
            ))}
          </ul>
      )
  }
    showInfo(){
        let {info} = this.state;
        return (
            <div>
                {info.name?<img src={info.avatar_url} alt={info.login}/>:''}
                <span>{info.name}</span>
            </div>
        )
    }
  render() {
    const { repoName, repos, error} = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Statistics repos={repos} width={WIDTH} height={HEIGHT} repoName={repoName}/>
        <div className={'info'}
             style={{'position':'absolute'}}
        >

          <form
              style={{
                padding: "16px 40px",
              }}
              onSubmit={e => {
                e.preventDefault();
                fetchRepos(repoName)
                    .then(repos => {
                      this.setState({ repos });
                    })
                    .catch(error => this.setState({ error }));
                fetchAccount(repoName)
                    .then(info =>{
                        this.setState({info})
                    })
              }}
          >
            <input
                value={repoName}
                placeholder={'Enter github name'}
                onChange={e => this.setState({ repoName: e.target.value })}
            />
            <button>Submit</button>
          </form>
          {error && <pre style={{ color: "red" }}>{error.message}</pre>}
          {/*<pre>{JSON.stringify(repos, null, 2)}</pre>*/}
          {this.renderList(repos)}


        </div>
        <div className={'infoAcc'}>
            {this.showInfo()}
        </div>

      </div>

    );

  }
}
